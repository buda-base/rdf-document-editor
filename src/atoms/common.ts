import { atom, atomFamily, selectorFamily, RecoilValue } from "recoil"
import { FC } from "react"
import _ from "lodash"

import * as ns from "../helpers/rdf/ns"
import { Value, Subject, LiteralWithId, errors } from "../helpers/rdf/types"
import { humanizeEDTF } from "../containers/ValueList"
import { entitiesAtom, EditedEntityState } from "../containers/EntitySelectorContainer"

//import edtf from "edtf/dist/../index.js"
import edtf, { parse } from "edtf" // see https://github.com/inukshuk/edtf.js/issues/36#issuecomment-1073778277

const debug = require("debug")("rde:common")

export const uiLangState = atom<Array<string>>({
  key: "uiLangState",
  default: ["en"],
})

export const uiLitLangState = atom<Array<string>>({
  key: "uiLitLangState",
  default: ["en"],
})

export const uiReadyState = atom<boolean>({
  key: "uiReadyState",
  default: false,
})

export const uiTabState = atom<number>({
  key: "uiTabState",
  default: -1,
})

export const uiRIDState = atom<string[]>({
  key: "uiRIDState",
  default: [],
})

export const uiEditState = atom<string>({
  key: "uiEditState",
  default: "",
})

export const uiGroupState = atom<string>({
  key: "uiGroupState",
  default: "",
})

export const uiHistoryState = atom<Record<string, never> | FC<{ string: { string: Array<Value> } }>>({
  key: "uiHistoryState",
  default: {},
})

export type undoState = {
  enabled: boolean
  subjectUri: string
  propertyPath: string
  parentPath: Array<string>
}

const sameUndoSub = (undo1: undoState, undo2: undoState) => {
  const ret =
    undo1.enabled === undo2.enabled &&
    undo1.subjectUri === undo2.subjectUri &&
    undo1.propertyPath === undo2.propertyPath &&
    undo1.parentPath.length === undo2.parentPath.length &&
    undo1.parentPath.filter((u, i) => u === undo2.parentPath[i]).length === undo1.parentPath.length
  //debug("same?",ret,undo1,undo2)
  return ret
}

export const sameUndo = (undo1: { prev: undoState; next: undoState }, undo2: { prev: undoState; next: undoState }) => {
  return (
    !undo1 && !undo2 || undo1 && undo2 && sameUndoSub(undo1.prev, undo2.prev) && sameUndoSub(undo1.next, undo2.next)
  )
}

export const noUndo = { enabled: false, subjectUri: "", propertyPath: "", parentPath: [] }

export const noUndoRedo = { prev: noUndo, next: noUndo }

export const uiUndosState = atom<Record<string, Record<string, undoState>>>({
  key: "uiUndosState",
  default: {},
})

export const uiNavState = atom<string>({
  key: "uiNavState",
  default: "",
})

export const sessionLoadedState = atom<boolean>({
  key: "sessionLoadedState",
  default: false,
})

export const profileIdState = atom<string>({
  key: "profileIdState",
  default: "",
})

export const uiDisabledTabsState = atom<boolean>({
  key: "uiDisabledTabsState",
  default: false,
})

export const userIdState = atom<string>({
  key: "userIdState",
  default: "",
})

export const reloadProfileState = atom<boolean>({
  key: "reloadProfileState",
  default: true,
})

export const reloadEntityState = atom<string>({
  key: "reloadEntityState",
  default: "",
})

export const RIDprefixState = atom<string | null>({
  key: "RIDprefixState",
  default: null,
})

type orderedByPropSelectorArgs = {
  atom: RecoilValue<Array<Subject>>
  propertyPath: string
  order: string
  toJSON: () => any
}
export const orderedByPropSelector = selectorFamily({
  key: "orderedByPropSelector",
  get:
    (args: orderedByPropSelectorArgs) =>
    ({ get }) => {
      let { atom, propertyPath, order } = args // eslint-disable-line prefer-const
      if (propertyPath) {
        if (!order) order = "asc"
        const unorderedList = get(atom)
        const orderedList = _.orderBy(
          unorderedList.map((s) => {
            let k
            const v: Value[] = get(s.getAtomForProperty(propertyPath))
            if (Array.isArray(v) && v.length) k = Number(v[0].value)
            else if (order === "desc") k = Number.MIN_SAFE_INTEGER
            else k = Number.MAX_SAFE_INTEGER
            return { s, k }
          }),
          ["k"],
          [order]
        ).map((i) => i.s)
        //debug("sort:", atom, propertyPath, orderedList)
        return orderedList
      }
      return []
    },
})

export const personNamesLabelsSelector = selectorFamily({
  key: "personNamesLabelsSelector",
  get:
    ({ atom }) =>
    ({ get }) => {
      if (atom) {
        const names = get(atom)
        const namesLabelsAtoms = names.map((n) => n.getAtomForProperty(ns.RDFS("label").value))
        const namesLabels = namesLabelsAtoms.reduce((acc, nl) => [...acc, ...get(nl)], [])
        //debug("values:", atom, names, namesLabelsAtoms,  namesLabels)
        return namesLabels
      }
      return []
    },
})

export const initListAtom = atom<Array<Value>>({ key: "initListAtom", default: [] })

export const initMapAtom = atom<Map<string, Value>>({ key: "initMapAtom", default: {} })

export const possiblePrefLabelsSelector = selectorFamily({
  key: "possiblePrefLabelsSelector",
  get:
    ({ canPushPrefLabelGroups }) =>
    ({ get }) => {
      if (canPushPrefLabelGroups) {
        //debug("push:",canPushPrefLabelGroups)
        const res = {}
        for (const g of Object.keys(canPushPrefLabelGroups)) {
          const labels = [],
            atoms = []
          Object.keys(canPushPrefLabelGroups[g].subprops).map((k) => {
            if (!canPushPrefLabelGroups[g].subprops[k].atom) return []
            const names = get(canPushPrefLabelGroups[g].subprops[k].atom)
            for (const n of names) {
              for (const a of canPushPrefLabelGroups[g].subprops[k].allowPush) {
                const vals = get(n.getAtomForProperty(a))
                vals.map((v) => labels.push(v))
              }
            }
            canPushPrefLabelGroups[g].props.map((a) => {
              const vals = get(a)
              vals.map((v) => labels.push(v))
            })
            return labels
          })
          if (labels.length) res[g] = labels
        }
        return res
      }
      return []
    },
})

export const EDTFtoOtherFieldsSelector = selectorFamily({
  key: "EDTFtoOtherFieldsSelector",
  get:
    ({ error, atoms }) =>
    ({ get }) => {
      if (error) return
      //debug("EDTF2ofs:get", error, atoms)
      return
    },
  set:
    ({ error, atoms }) =>
    ({ set }, { lit, val, obj }) => {
      if (error) return
      //debug("EDTF2ofs:set", error, atoms, lit, val, obj)
      //debug(humanizeEDTF(obj, val, true))

      if (obj.type === "Date" && !obj.unspecified) {
        //debug("set EDTFa:",lit,val,obj)
        set(atoms["bdo:onYear"], [new LiteralWithId(String(obj.values[0]), "", ns.XSD("gYear"))])
        set(atoms["bdo:notBefore"], [])
        set(atoms["bdo:notAfter"], [])
      } else {
        try {
          //debug("set EDTFb:",lit,val,obj)
          set(atoms["bdo:onYear"], [])
          const edtfMin = edtf(edtf(val).min)
          if (edtfMin.values[0])
            set(atoms["bdo:notBefore"], [new LiteralWithId(String(edtfMin.values[0]), "", ns.XSD("gYear"))])
          const edtfMax = edtf(edtf(val).max)
          if (edtfMax.values[0])
            set(atoms["bdo:notAfter"], [new LiteralWithId(String(edtfMax.values[0]), "", ns.XSD("gYear"))])
        } catch (e) {
          debug("EDTF error:", e, edtf)
        }
      }
      return
    },
})

export const orderedNewValSelector = selectorFamily({
  key: "orderedNewValSelector",
  get:
    ({ atom, propertyPath, order, shape }) =>
    ({ get }) => {
      let newVal = ""
      if (atom) {
        if (!order) order = "asc"
        newVal = ""

        //debug("nV")
        const parentList = get(atom)
        parentList.map((s, i) => {
          if (i < parentList.length - 1 - 1) return // try to speed things as list is sorted
          let k = get(s.getAtomForProperty(propertyPath))
          if (Array.isArray(k) && k.length) k = Number(k[0].value)
          //debug("k:",k)
          if (newVal === "" || order === "asc" && k >= newVal || order === "desc" && k <= newVal) {
            if (order === "asc") newVal = k + 1
            else newVal = k - 1
          }
        })
        //debug("newVal:", newVal) //, atom, propertyPath, parentList)
      }
      return "" + newVal
    },
})

export const toCopySelector = selectorFamily({
  key: "toCopySelector",
  get:
    ({ list }) =>
    ({ get }) => {
      const res = {}
      list.map(({ property, atom }) => {
        const val = get(atom)
        //debug("copy:",property, val, atom)
        res[property] = val
      })
      return res
    },
  set:
    ({ list }) =>
    ({ get, set }, { k, val }) => {
      //debug("set:", list, k, val)
      list.map(({ property, atom }) => {
        if (k == property) set(atom, [...get(atom).filter((lit) => lit.value), ...val])
      })
    },
})

export const savePopupState = atom<boolean>({
  key: "savePopupState",
  default: false,
})

export const ESfromRecoilSelector = selectorFamily({
  key: "ESfromRecoilSelector",
  get:
    ({}) =>
    ({ get }) => {
      return true
    },
  set:
    ({}) =>
    ({ get, set }, { property, subject, entityQname, undo, hStatus, status, id, removingFacet, forceRemove }) => {
      const entities = get(entitiesAtom)
      const setEntities = (val) => set(entitiesAtom, val)

      //debug("UES:", status, entityQname, id, removingFacet, forceRemove, undo, hStatus)

      const n = entities.findIndex((e) => e.subjectQname === entityQname)
      if (n > -1) {
        const ent: Entity = entities[n]
        if (status === EditedEntityState.Error) {
          //debug("error:", id, status, ent.state, ent, n, property.qname, errors)

          if (!errors[ent.subjectQname]) errors[ent.subjectQname] = {}
          errors[ent.subjectQname][subject.qname + ";" + property.qname + ";" + id] = true

          if (ent.state != status) {
            const newEntities = [...entities]
            newEntities[n] = { ...entities[n], state: status }
            setEntities(newEntities)
          }
        } else if (status !== EditedEntityState.Error) {
          // DONE: update status to NeedsSaving for newly created entity and not for loaded entity
          status =
            ent.alreadySaved && (!undo || undo.prev && !undo.prev.enabled) && !ent.loadedUnsavedFromLocalStorage
              ? EditedEntityState.Saved
              : EditedEntityState.NeedsSaving

          const hasError =
            errors[ent.subjectQname] && errors[ent.subjectQname][subject.qname + ";" + property.qname + ";" + id]

          //debug("no error:", hasError, forceRemove, id, status, ent.state, ent, n, property.qname, errors)
          if (ent.state != status || hasError && forceRemove) {
            //debug("status:", ent.state, status)
            if (removingFacet) {
              //debug("rf:", id)
              if (errors[ent.subjectQname]) {
                const keys = Object.keys(errors[ent.subjectQname])
                for (const k of keys) {
                  if (k.startsWith(id)) delete errors[ent.subjectQname][k]
                }
              }
            } else if (hasError) {
              delete errors[ent.subjectQname][subject.qname + ";" + property.qname + ";" + id]
            }
            if (!errors[ent.subjectQname] || !Object.keys(errors[ent.subjectQname]).length) {
              const newEntities = [...entities]
              newEntities[n] = { ...entities[n], state: status }
              setEntities(newEntities)
              //debug("newEnt:",newEntities[n].state)
            }
          }
        }
      }
    },
})

export const isUniqueTestSelector = selectorFamily({
  key: "isUniqueTestSelector",
  get:
    ({ checkUnique, siblingsAtom, propertyPath }) =>
    ({ get }) => {
      if (!checkUnique) return true
      //debug("iUvS:",siblingsAtom, propertyPath)
      const siblings = get(siblingsAtom),
        vals = []
      for (const s of siblings) {
        const lit = get(s.getAtomForProperty(propertyPath))
        if (lit.length) {
          if (vals.includes(lit[0].value)) {
            //debug("non unique:",propertyPath,vals,lit,siblings)
            return false
          }
          vals.push(lit[0].value)
        }
      }
      //debug("unique:",propertyPath,vals,siblings)
      return true
    },
})

export const outlinesAtom = atom<Map<string, any>>({
  key: "outlinesAtom",
  default: {},
})

export const demoAtom = atom<boolean>({
  key: "demoAtom",
  default: false,
})
