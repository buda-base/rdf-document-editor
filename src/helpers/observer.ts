import {
  uiReadyState,
  uiHistoryState,
  uiTabState,
  uiUndosState,
  noUndo,
  noUndoRedo,
  undoState,
} from "../atoms/common"
import {
  LiteralWithId,
  RDFResourceWithLabel,
  ExtRDFResourceWithLabel,
  Value,
  Subject,
  history,
} from "./rdf/types"

const debug = require("debug")("bdrc:observer")

export let undoRef = null
export let redoRef = null

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
