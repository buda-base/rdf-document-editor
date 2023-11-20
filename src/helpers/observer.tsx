import React, { FC, createRef, RefObject } from "react"
import {
  useRecoilState,
} from "recoil"
import { Subject, history } from "./rdf/types"
import * as atoms from "../atoms/common"

export let undoRef: RefObject<HTMLButtonElement> | null = null
export let redoRef: RefObject<HTMLButtonElement> | null = null

export function getParentPath(entityUri: string, sub: string) {
  let parentPath: Array<string> = []
  // manually check which property has this subnode as value
  for (const h of history[entityUri]) {
    const subSubj = Object.keys(h).filter((k) => !["tmp:parent", "tmp:undone"].includes(k))
    for (const s of subSubj) {
      const subprop = Object.keys(h[s]).filter((k) => !["tmp:parent", "tmp:undone"].includes(k))
      for (const p of subprop) {
        if (typeof h[s][p] !== "string")
          for (const v of h[s][p]) {
            if (v instanceof Subject && v.uri === sub) {
              if (parentPath.length > 1 && parentPath[1] !== p)
                throw new Error("multiple property (" + parentPath + "," + p + ") for node " + sub)
              if (s !== entityUri) parentPath = getParentPath(entityUri, s)
              parentPath.push(s)
              parentPath.push(p)
            }
          }
      }
    }
  }
  return parentPath
}

const GotoButton: FC<{
  label: string
  subject: Subject
  undo: atoms.undoPN
  setUndo: (s: atoms.undoPN) => void
  propFromParentPath?: string
}> = ({ label, subject, undo, setUndo, propFromParentPath }) => {
  const entityUri = subject.uri

  //debug("goto?", current, subject, subject.qname)

  // DONE: pass subject to UndoButton subcomponent
  const which = label === "UNDO" ? "prev" : "next"
  const [list, setList] = useRecoilState(
    subject.getAtomForProperty(
      propFromParentPath
        ? propFromParentPath
        : undo[which].parentPath.length && undo[which].parentPath[0] === entityUri
        ? undo[which].parentPath[1]
        : undo[which].propertyPath
    )
  )
  const disabled = !undo[which].enabled

  // find previous list of values for current property to undo
  const previousValues = (entityUri: string, subjectUri: string, pathString: string, idx: number) => {
    const histo = history[entityUri],
      prevUndo: atoms.undoPN = {
        ...atoms.noUndoRedo,
        next: { enabled: true, subjectUri, propertyPath: pathString, parentPath: undo[which].parentPath },
      }
    let vals = []
    if (histo && histo.length > idx) {
      const first = histo.findIndex((h) => h["tmp:allValuesLoaded"])
      histo[idx]["tmp:undone"] = true
      for (let j = idx - 1; j >= 0; j--) {
        if (histo[j] && histo[j][subjectUri] && histo[j][subjectUri][pathString]) {
          // we found previous value list for subject/property
          vals = histo[j][subjectUri][pathString]
          break
        }
      }
      // update undo state to previous one if any
      if (first >= 0 && idx > first) {
        const parentPath = histo[idx - 1]["tmp:parentPath"] || []
        for (const subj of Object.keys(histo[idx - 1])) {
          for (const prop of Object.keys(histo[idx - 1][subj])) {
            if (["tmp:parentPath", "tmp:undone"].includes(prop)) continue
            prevUndo.prev = { enabled: true, subjectUri: subj, propertyPath: prop, parentPath }
            break
          }
          if (prevUndo.prev.enabled) break
        }
      }
    }
    return { vals, prevUndo }
  }

  // find next list if values for current property to undo
  const nextValues = (entityUri: string, subjectUri: string, pathString: string, idx: number) => {
    const histo = history[entityUri],
      nextUndo: atoms.undoPN = {
        ...atoms.noUndoRedo,
        prev: { enabled: true, subjectUri, propertyPath: pathString, parentPath: undo[which].parentPath },
      }
    let vals = []
    if (histo && histo.length > idx) {
      for (let j = idx; j < histo.length; j++) {
        if (histo[j] && histo[j][subjectUri] && histo[j][subjectUri][pathString]) {
          // we found next value list for subject/property
          vals = histo[j][subjectUri][pathString]
          delete histo[j]["tmp:undone"]
          break
        }
      }
      // update undo state to next one if any
      if (idx < histo.length - 1) {
        const parentPath = histo[idx + 1]["tmp:parentPath"] || []
        for (const subj of Object.keys(histo[idx + 1])) {
          for (const prop of Object.keys(histo[idx + 1][subj])) {
            if (["tmp:parentPath", "tmp:undone"].includes(prop)) continue
            nextUndo.next = { enabled: true, subjectUri: subj, propertyPath: prop, parentPath }
            break
          }
          if (nextUndo.next.enabled) break
        }
      }
    }
    return { vals, nextUndo }
  }

  // this is where we check history for available previous/next value modification
  const clickHandler = () => {
    if (disabled) return
    const entityUri = undo[which].parentPath.length ? undo[which].parentPath[0] : subject.uri
    if (entityUri) {
      let idx = history[entityUri].findIndex((h) => h["tmp:undone"]) - 1 + (label === "REDO" ? 1 : 0)
      if (idx < 0) idx = history[entityUri].length - 1
      if (history[entityUri][idx]) {
        if (label === "UNDO") {
          const { vals, prevUndo } = previousValues(entityUri, undo[which].subjectUri, undo[which].propertyPath, idx)
          subject.noHisto(true)
          setList(vals)
          setUndo(prevUndo)
          //debug(label, "l:", list, "v:", vals, prevUndo)
        } else if (label === "REDO") {
          const { vals, nextUndo } = nextValues(entityUri, undo[which].subjectUri, undo[which].propertyPath, idx)
          subject.noHisto(true)
          setList(vals)
          setUndo(nextUndo)
          //debug(label, "l:", list, "v:", vals, nextUndo)
        }
      }
    }
  }

  // sub-render button when current property to undo/redo is not top-level
  if (undo[which].parentPath.length && entityUri !== undo[which].subjectUri) {
    //debug("parent:", entityUri, undo[which].subjectUri, list, subject, undo[which].parentPath)
    const subnode = list.filter((l) => l instanceof Subject && l.uri === undo[which].subjectUri)
    if (subnode.length) {
      //debug("SUB:", list)
      return <GotoButton label={label} undo={undo} setUndo={setUndo} subject={subnode[0] as Subject} />
    } else {
      const midnode = list.filter((l) => l instanceof Subject && undo[which].parentPath.includes(l.uri))
      if (midnode.length) {
        const s = midnode[0] as Subject
        const p = undo[which].parentPath.findIndex((h: string) => h === s.uri)
        //debug("MID:", midnode, s, p)
        return (
          <GotoButton
            label={label}
            undo={undo}
            setUndo={setUndo}
            subject={s}
            propFromParentPath={undo[which].parentPath[p + 1]}
          />
        )
      } else {
        //debug("NULL:", entityUri, list, undo)

        // we don't need this:
        // throw new Error("could not find subnode")

        return null
      }
    }
  }

  //debug(label + " button:", entityUri, undo[which])

  const ref = createRef<HTMLButtonElement>()
  if (label === "UNDO") undoRef = ref
  else if (label === "REDO") redoRef = ref

  return (
    <button
      ref={ref}
      disabled={disabled}
      key={label}
      className={"btn btn-sm btn-danger mx-1 icon undo-btn btn-blanc"}
      onClick={clickHandler}
    >
      {label}
    </button>
  )
}

export const HistoryHandler: FC<{ entityUri: string }> = ({ entityUri }) => {
  const [entities, setEntities] = useRecoilState(atoms.entitiesAtom)
  const [uiTab] = useRecoilState(atoms.uiTabState)
  const [undos, setUndos] = useRecoilState(atoms.uiUndosState)
  const undo = undos[entityUri]
  const setUndo = (s: atoms.undoPN) => setUndos({ ...undos, [entityUri]: s })

  if (!entities[uiTab]) return null

  //debug("histo:", entityUri, entities[uiTab].subject)

  const subject = entities[uiTab].subject

  //debug("uiTab:", uiTab, subject, undo)

  return (
    <div className="small text-muted">
      {subject && undo && <GotoButton label="UNDO" subject={subject} undo={undo} setUndo={setUndo} />}
      {subject && undo && <GotoButton label="REDO" subject={subject} undo={undo} setUndo={setUndo} />}
    </div>
  )
}
