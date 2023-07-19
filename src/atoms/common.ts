import { atom, selectorFamily, RecoilValue, RecoilState, DefaultValue } from "recoil"
import { FC } from "react"
import _ from "lodash"
import * as ns from "../helpers/rdf/ns"
import * as shapes from "../helpers/rdf/shapes"
import { Value, Subject, LiteralWithId, errors, HistoryStatus } from "../helpers/rdf/types"
import { debug as debugfactory } from "debug"

const debug = debugfactory("rde:common")

export enum EditedEntityState {
  Error,
  Saved,
  NeedsSaving,
  Loading,
  NotLoaded,
}

export type Entity = {
  subjectQname: string
  subject: Subject | null
  shapeQname: string
  state: EditedEntityState
  subjectLabelState: RecoilState<Array<Value>>
  preloadedLabel?: string
  etag: string | null
  loadedUnsavedFromLocalStorage: boolean // true when localStorage has unsaved changes
}

export const entitiesAtom = atom<Array<Entity>>({
  key: "rde_entities",
  default: [],
})

export const defaultEntityLabelAtom = atom<Array<Value>>({
  key: "rde_defaultEntityLabelAtom",
  default: [new LiteralWithId("...", "en")], // TODO: use the i18n stuff
})

export const uiLangState = atom<string>({
  key: "rde_uiLangState",
  default: "en",
})

export const uiLitLangState = atom<Array<string>>({
  key: "rde_uiLitLangState",
  default: ["en"],
})

export const uiReadyState = atom<boolean>({
  key: "rde_uiReadyState",
  default: false,
})

export const uiTabState = atom<number>({
  key: "rde_uiTabState",
  default: -1,
})

export const uiRIDState = atom<string[]>({
  key: "rde_uiRIDState",
  default: [],
})

export const uiEditState = atom<string>({
  key: "rde_uiEditState",
  default: "",
})

export const uiGroupState = atom<string>({
  key: "rde_uiGroupState",
  default: "",
})

export const uiHistoryState = atom<Record<string, never> | FC<{ string: { string: Array<Value> } }>>({
  key: "rde_uiHistoryState",
  default: {},
})

export type undoState = {
  enabled: boolean
  subjectUri: string
  propertyPath: string
  parentPath: Array<string>
}

export type undoPN = {
  prev: undoState,
  next: undoState
}

export const sameUndoSub = (undo1: undoState, undo2: undoState) => {
  const ret =
    undo1.enabled === undo2.enabled &&
    undo1.subjectUri === undo2.subjectUri &&
    undo1.propertyPath === undo2.propertyPath &&
    undo1.parentPath.length === undo2.parentPath.length &&
    undo1.parentPath.filter((u, i) => u === undo2.parentPath[i]).length === undo1.parentPath.length
  //debug("same?",ret,undo1,undo2)
  return ret
}

export const sameUndo = (undo1: undoPN | null, undo2: undoPN |null) => {
  return (
    !undo1 && !undo2 || undo1 && undo2 && sameUndoSub(undo1.prev, undo2.prev) && sameUndoSub(undo1.next, undo2.next)
  )
}

export const noUndo = { enabled: false, subjectUri: "", propertyPath: "", parentPath: [] }

export const noUndoRedo = { prev: noUndo, next: noUndo }

export const uiUndosState = atom<Record<string, undoPN>>({
  key: "rde_uiUndosState",
  default: {},
})

export const uiNavState = atom<string>({
  key: "rde_uiNavState",
  default: "",
})

export const sessionLoadedState = atom<boolean>({
  key: "rde_sessionLoadedState",
  default: false,
})

export const uiDisabledTabsState = atom<boolean>({
  key: "rde_uiDisabledTabsState",
  default: false,
})

export const reloadEntityState = atom<string>({
  key: "rde_reloadEntityState",
  default: "",
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
export const orderedByPropSelector = selectorFamily<any, orderedByPropSelectorArgs>({
  key: "rde_orderedByPropSelector",
  get:
    (args: orderedByPropSelectorArgs) =>
    ({ get }) => {
      let { atom, propertyPath, order } = args // eslint-disable-line prefer-const
      if (propertyPath) {
        if (!order) order = "asc"
        const unorderedList = get(atom)
        const orderedList = _.orderBy(
          unorderedList.map((w: Value) => {
            if (w instanceof Subject) {
              const s: Subject = w
              let k
              const v: Value[] = get(s.getAtomForProperty(propertyPath))
              if (Array.isArray(v) && v.length) k = Number(v[0].value)
              else if (order === "desc") k = Number.MIN_SAFE_INTEGER
              else k = Number.MAX_SAFE_INTEGER
              return { s, k }
            }
            return { s: w, k: order === "asc" ? Number.MAX_SAFE_INTEGER : Number.MIN_SAFE_INTEGER }
          }),
          ["k"],
          [order === "asc" ? "asc" : "desc"]
        ).map((i: { s: Subject | Value; k: number }) => i.s)
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
export const personNamesLabelsSelector = selectorFamily<any, personNamesLabelsSelectorArgs>({
  key: "rde_personNamesLabelsSelector",
  get:
    (args: personNamesLabelsSelectorArgs) =>
    ({ get }) => {
      const { atom } = args
      if (atom) {
        const names = get(atom)
        const namesLabelsAtoms = names.map((n: Subject) => n.getAtomForProperty(ns.rdfsLabel.uri))
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

export const initListAtom = atom<Array<Value>>({ key: "rde_initListAtom", default: [] })

export const initStringAtom = atom<string>({ key: "rde_initStringAtom", default: "" })

export const initMapAtom = atom<Record<string, Value[]>>({ key: "rde_initMapAtom", default: {} })

// TODO: the as is not great...
export const initkvAtom = atom<{ k: string; val: Value[] }>({
  key: "rde_initkvAtom",
  default: {} as { k: string; val: Value[] },
})

export type canPushPrefLabelGroupType = {
  props?: RecoilState<Value[]>[]
  subprops?: Record<string, { atom: RecoilState<Subject[]>; allowPush: string[] }>
}

export type canPushPrefLabelGroupsType = {
  canPushPrefLabelGroups: Record<string, canPushPrefLabelGroupType>
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const possiblePrefLabelsSelector = selectorFamily<Record<string, Value[]>, canPushPrefLabelGroupsType>({
  key: "rde_possiblePrefLabelsSelector",
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
export const orderedNewValSelector = selectorFamily<string, orderedNewValSelectorType>({
  key: "rde_orderedNewValSelector",
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
  list?: toCopySelectorsType
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const toCopySelector = selectorFamily<{ k: string; val: Value[] }[], toCopySelectorType>({
  key: "rde_toCopySelector",
  get:
    (args: toCopySelectorType) =>
    ({ get }) => {
      const res: { k: string; val: Value[] }[] = []
      args.list?.map(({ property, atom }) => {
        const val = get(atom)
        //debug("copy:",property, val, atom)
        res.push({ k: property, val: val })
      })
      return res
    },
  set:
    (args: toCopySelectorType) =>
    ({ get, set }, newValue: DefaultValue|{ k: string; val: Value[] }[]) => {
      if(newValue instanceof DefaultValue) {
        return
      }
      const { k, val } = newValue[0]
      //debug("set:", list, k, val)
      args.list?.map(({ property, atom }) => {
        if (k == property) set(atom, [...get(atom).filter((lit) => lit.value), ...val])
      })
    },
})

export const savePopupState = atom<boolean>({
  key: "rde_savePopupState",
  default: false,
})

export type ESfromRecoilSelectorType = {
  property: shapes.PropertyShape
  subject: Subject
  entityQname: string
  undo: Record<string, undoState>
  hStatus: HistoryStatus
  status: EditedEntityState
  id: string
  removingFacet: boolean
  forceRemove: boolean
}

export const ESfromRecoilSelector = selectorFamily<any, any>({
  key: "rde_ESfromRecoilSelector",
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
          errors[ent.subjectQname] &&
          errors[ent.subjectQname][args.subject.qname + ";" + args.property.qname + ";" + args.id]

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
  siblingsAtom: RecoilState<Subject[]>
  propertyPath: string
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const isUniqueTestSelector = selectorFamily<boolean, isUniqueTestSelectorType>({
  key: "rde_isUniqueTestSelector",
  get:
    (args: isUniqueTestSelectorType) =>
    ({ get }) => {
      if (!args.checkUnique) return true
      //debug("iUvS:",siblingsAtom, propertyPath)
      const siblings = get(args.siblingsAtom),
        vals: string[] = []
      for (const s of siblings) {
        const lit: Value[] = get(s.getAtomForProperty(args.propertyPath))
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


