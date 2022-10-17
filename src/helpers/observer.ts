import { uiReadyState, uiHistoryState, uiTabState, uiUndosState, noUndo, noUndoRedo, undoState } from "../atoms/common"
import { LiteralWithId, RDFResourceWithLabel, ExtRDFResourceWithLabel, Value, Subject } from "./rdf/types"

const debug = require("debug")("bdrc:observer")

// global variable, should be in config?
export const history: Record<string, Array<Record<string, any>>> = {}

export type HistoryStatus = {
  top?: number
  first?: number
  current?: number
}

// get info from history (values modified? values undone?)
export const getHistoryStatus = (entityUri: string): HistoryStatus => {
  if (!history[entityUri]) return {}

  // DONE: optimizing a bit (1 for instead of 2 .findIndex + 1 .some)
  const top = history[entityUri].length - 1
  let first = -1,
    current = -1
  for (const [i, h] of history[entityUri].entries()) {
    if (h["tmp:allValuesLoaded"]) first = i
    else if (h["tmp:undone"]) current = i - 1
    if (first != -1 && current != -1) break
  }
  return { top, first, current }
}

export const updateHistory = (
  entity: string,
  qname: string,
  prop: string,
  val: Array<Value>,
  noHisto: boolean | number = true
) => {
  if (!history[entity]) history[entity] = []
  else {
    while (history[entity].length && history[entity][history[entity].length - 1]["tmp:undone"]) {
      history[entity].pop()
    }
  }
  const newVal = {
    [qname]: { [prop]: val },
    ...entity != qname ? { "tmp:parentPath": getParentPath(entity, qname) } : {},
  }

  // don't add empty value to history (fix adding undo steps when showing secondary properties in Person/Kinship)
  if (val.length === 1 && !(val[0] instanceof LiteralWithId) && val[0].uri === "tmp:uri" || val[0].value === "") return

  // some value modifications must not be added to history (some autocreation of empty values for example)
  if (noHisto === -1) {
    const first = history[entity].findIndex((h) => h["tmp:allValuesLoaded"])
    if (first > 0) history[entity].splice(first, 0, newVal)
    else history[entity].push(newVal)
  } else history[entity].push(newVal)

  //debug("history:", entity, qname, prop, val, history, noHisto)
}

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
