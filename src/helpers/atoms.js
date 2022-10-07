import { atom } from "recoil"
import memoize from "./memoize"

// Generic utils
const atomListWithID = memoize((id) =>
  atom({
    key: `atom_list_${id}`,
    default: [],
  })
)

const atomWithID = memoize((id) =>
  atom({
    key: `atom_${id}`,
    default: "",
  })
)

const atomObjectWithID = memoize((id) =>
  atom({
    key: `atom_${id}`,
    default: {},
  })
)

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)]
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)]
}

export { atomListWithID, atomWithID, atomObjectWithID, replaceItemAtIndex, removeItemAtIndex }
