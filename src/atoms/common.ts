import { atom, atomFamily, selectorFamily, RecoilValue, RecoilState } from "recoil"
import { FC } from "react"
import _ from "lodash"
import * as ns from "../helpers/rdf/ns"
import * as shapes from "../helpers/rdf/shapes"
import { Value, Subject, LiteralWithId, errors, emptyLiteral } from "../helpers/rdf/types"
import { HistoryStatus } from "../helpers/observer"
import { entitiesAtom, EditedEntityState, Entity } from "../containers/EntitySelectorContainer"

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

export type orderedByPropSelectorArgs = {
  atom: RecoilValue<Array<Value>>
  propertyPath: string
  order: string
}

// I don't quite understand why TS complains here, but it does, see
// https://stackoverflow.com/questions/37006008/typescript-index-signature-is-missing-in-type

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const orderedByPropSelector = selectorFamily<any,orderedByPropSelectorArgs>({
  key: "orderedByPropSelector",
  get:
    (args: orderedByPropSelectorArgs) =>
    ({ get }) => {
      let { atom, propertyPath, order } = args // eslint-disable-line prefer-const
      if (propertyPath) {
        if (!order) order = "asc"
        const unorderedList = get(atom)
        const orderedList = _.orderBy(
          unorderedList.map((w:Value) => {
            if(w instanceof Subject) {
              const s:Subject = w
              let k
              const v: Value[] = get(s.getAtomForProperty(propertyPath))
              if (Array.isArray(v) && v.length) k = Number(v[0].value)
              else if (order === "desc") k = Number.MIN_SAFE_INTEGER
              else k = Number.MAX_SAFE_INTEGER
              return { s, k }
            }
            return { s:w, k:order === "asc" ? Number.MAX_SAFE_INTEGER : Number.MIN_SAFE_INTEGER } 
          }),
          ["k"],
          [order === "asc" ? "asc" : "desc"]
        ).map((i: {s: Subject|Value, k: number}) => i.s)
        //debug("sort:", atom, propertyPath, orderedList)
        return orderedList
      }
      return []
    },
})

export type personNamesLabelsSelectorArgs = {
  atom: RecoilValue<Array<Subject>>
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const personNamesLabelsSelector = selectorFamily<any,personNamesLabelsSelectorArgs>({
  key: "personNamesLabelsSelector",
  get:
    (args: personNamesLabelsSelectorArgs) =>
    ({ get }) => {
      const { atom } = args
      if (atom) {
        const names = get(atom)
        const namesLabelsAtoms = names.map((n: Subject) => n.getAtomForProperty(shapes.rdfsLabel.uri))
        const namesLabels = namesLabelsAtoms.reduce(
          (acc: Value[], nl: RecoilState<Value[]>) => [...acc, ...get(nl)],
          []
        )
        //debug("values:", atom, names, namesLabelsAtoms,  namesLabels)
        return namesLabels
      }
      return []
    },
})

export const initListAtom = atom<Array<Value>>({ key: "initListAtom", default: [] })

export const initStringAtom = atom<string>({ key: "initStringAtom", default: "" })

export const initMapAtom = atom<Record<string, Value[]>>({ key: "initMapAtom", default: {} })

export type canPushPrefLabelGroupType = {
  props?: RecoilState<Value[]>[]
  subprops?: Record<string, { atom: RecoilState<Subject[]>; allowPush: string[] }>
}

export type canPushPrefLabelGroupsType = {
 canPushPrefLabelGroups: Record<string,canPushPrefLabelGroupType>,
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const possiblePrefLabelsSelector = selectorFamily<Record<string,Value[]>,canPushPrefLabelGroupsType>({
  key: "possiblePrefLabelsSelector",
  get:
    (args: canPushPrefLabelGroupsType) =>
    ({ get }) => {
      //debug("push:",canPushPrefLabelGroups)
      const res: Record<string, Value[]> = {}
      for (const g of Object.keys(args.canPushPrefLabelGroups)) {
        const labels: Value[] = [],
          atoms = []
        const canPushPrefLabelGroup: canPushPrefLabelGroupType = args.canPushPrefLabelGroups[g]
        if (canPushPrefLabelGroup.subprops) {
          Object.keys(canPushPrefLabelGroup.subprops).map((k: string) => {
            if (!canPushPrefLabelGroup.subprops || !canPushPrefLabelGroup.subprops[k].atom) return []
            const names = get(canPushPrefLabelGroup.subprops[k].atom)
            for (const n of names) {
              for (const a of canPushPrefLabelGroup.subprops[k].allowPush) {
                const vals = get(n.getAtomForProperty(a))
                vals.map((v: Value) => labels.push(v))
              }
            }
            if (canPushPrefLabelGroup.props) {
              canPushPrefLabelGroup.props.map((a: RecoilValue<Value[]>) => {
                const vals: Value[] = get(a)
                vals.map((v: Value) => labels.push(v))
              })
            }
            return labels
          })
        }
        if (labels.length) res[g] = labels
      }
      return res
    },
})

export type orderedNewValSelectorType = {
  atom: RecoilState<Subject[]> | null
  propertyPath: string
  order?: "asc" | "desc"
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const orderedNewValSelector = selectorFamily<string,orderedNewValSelectorType>({
  key: "orderedNewValSelector",
  get:
    (args: orderedNewValSelectorType) =>
    ({ get }) => {
      let newVal = -1
      if (args.atom) {
        const order = args.order ? args.order : "asc"

        //debug("nV")
        const parentList = get(args.atom)
        parentList.map((s, i) => {
          if (i < parentList.length - 1 - 1) return // try to speed things as list is sorted
          const k = get(s.getAtomForProperty(args.propertyPath))
          let kint = 0
          if (Array.isArray(k) && k.length) kint = Number(k[0].value)
          //debug("k:",k)
          if (newVal === -1 || order === "asc" && kint >= newVal || order === "desc" && kint <= newVal) {
            if (order === "asc") newVal = kint + 1
            else newVal = kint - 1
          }
        })
        //debug("newVal:", newVal) //, atom, propertyPath, parentList)
      }
      return newVal.toString()
    },
})

export type toCopySelectorsType = Array<{
  property: string
  atom: RecoilState<Value[]>
}>

export type toCopySelectorType = {
  list: toCopySelectorsType
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const toCopySelector = selectorFamily<Record<string,Value[]>,toCopySelectorType>({
  key: "toCopySelector",
  get:
    (args: toCopySelectorType) =>
    ({ get }) => {
      const res: Record<string, Value[]> = {}
      args.list.map(({ property, atom }) => {
        const val = get(atom)
        //debug("copy:",property, val, atom)
        res[property] = val
      })
      return res
    },
  set:
    (args: toCopySelectorType) =>
    ({ get, set }, { k, val }: {k: string, val: Value[]}) => {
      //debug("set:", list, k, val)
      args.list.map(({ property, atom }) => {
        if (k == property) set(atom, [...get(atom).filter((lit) => lit.value), ...val])
      })
    },
})

export const savePopupState = atom<boolean>({
  key: "savePopupState",
  default: false,
})

export type ESfromRecoilSelectorType = {
  property: shapes.PropertyShape,
  subject: Subject,
  entityQname: string,
  undo: Record<string,undoState>,
  hStatus: HistoryStatus,
  status: EditedEntityState
  id: string
  removingFacet: boolean
  forceRemove: boolean
}


export const ESfromRecoilSelector = selectorFamily<any,{}>({
  key: "ESfromRecoilSelector",
  get:
    ({}) =>
    ({ get }) => {
      return true
    },
  set:
    ({}) =>
    ({ get, set }, args: ESfromRecoilSelectorType) => {

      const entities = get(entitiesAtom)
      const setEntities = (val: Entity[]) => set(entitiesAtom, val)

      //debug("UES:", status, entityQname, id, removingFacet, forceRemove, undo, hStatus)

      const n = entities.findIndex((e) => e.subjectQname === args.entityQname)

      if (n > -1) {
        const ent: Entity = entities[n]
        if (args.status === EditedEntityState.Error) {
          //debug("error:", id, status, ent.state, ent, n, property.qname, errors)

          if (!errors[ent.subjectQname]) errors[ent.subjectQname] = {}
          errors[ent.subjectQname][args.subject.qname + ";" + args.property.qname + ";" + args.id] = true

          if (ent.state != args.status) {
            const newEntities = [...entities]
            newEntities[n] = { ...entities[n], state: args.status }
            setEntities(newEntities)
          }
          return
        }
        // DONE: update status to NeedsSaving for newly created entity and not for loaded entity
        const status =
          ent.etag && (!args.undo || args.undo.prev && !args.undo.prev.enabled) && !ent.loadedUnsavedFromLocalStorage
            ? EditedEntityState.Saved
            : EditedEntityState.NeedsSaving

        const hasError =
          errors[ent.subjectQname] && errors[ent.subjectQname][args.subject.qname + ";" + args.property.qname + ";" + args.id]

        //debug("no error:", hasError, forceRemove, id, status, ent.state, ent, n, property.qname, errors)
        if (ent.state != status || hasError && args.forceRemove) {
          //debug("status:", ent.state, status)
          if (args.removingFacet) {
            //debug("rf:", id)
            if (errors[ent.subjectQname]) {
              const keys = Object.keys(errors[ent.subjectQname])
              for (const k of keys) {
                if (k.startsWith(args.id)) delete errors[ent.subjectQname][k]
              }
            }
          } else if (hasError) {
            delete errors[ent.subjectQname][args.subject.qname + ";" + args.property.qname + ";" + args.id]
          }
          if (!errors[ent.subjectQname] || !Object.keys(errors[ent.subjectQname]).length) {
            const newEntities = [...entities]
            newEntities[n] = { ...entities[n], state: status }
            setEntities(newEntities)
            //debug("newEnt:",newEntities[n].state)
          }
        }
      }
    },
})

export type isUniqueTestSelectorType = {
  checkUnique: boolean
  siblingsAtom: RecoilState<Subject[]>,
  propertyPath: string
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const isUniqueTestSelector = selectorFamily<boolean,isUniqueTestSelectorType>({
  key: "isUniqueTestSelector",
  get:
    (args: isUniqueTestSelectorType) =>
    ({ get }) => {
      if (!args.checkUnique) return true
      //debug("iUvS:",siblingsAtom, propertyPath)
      const siblings = get(args.siblingsAtom),
        vals:string[] = []
      for (const s of siblings) {
        const lit:Value[] = get(s.getAtomForProperty(args.propertyPath))
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

