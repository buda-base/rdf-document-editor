import { debug as debugfactory } from "debug"

const debug = debugfactory("rde:rdf:lang")

export type Lang = {
  value: string
  keyboard?: string[]
}

// default function, can be overridden in config
export const ValueByLangToStrPrefLang = (vbl: Record<string, string> | null, prefLang: string | Array<string>) => {
  if (vbl == null) return ""
  if (!Array.isArray(prefLang)) prefLang = [prefLang]
  for (const pL of prefLang) {
    if (pL in vbl) return vbl[pL]
  }
  const vals = Object.values(vbl)
  if (vals[0]) return vals[0]
  return ""
}

// a little memoization
const cache: Record<string, Lang[]> = {}

export const langsWithDefault = (defaultLanguage: string, langs: Array<Lang>): Array<Lang> => {
  if (defaultLanguage in cache) return cache[defaultLanguage]
  let res = langs.filter((l) => l.value === defaultLanguage)
  if (!res?.length) {
    debug("can't find defaultLanguage ", defaultLanguage, " in languages")
    return langs
  }
  res = res.concat(langs.filter((l) => l.value !== defaultLanguage))
  cache[defaultLanguage] = res
  return res
}
