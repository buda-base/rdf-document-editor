import "./jsewts.d.ts"

import { fromWylie } from "jsewts"

const debug = require("debug")("rde:rdf:lang")

export const ValueByLangToStrPrefLang = (vbl: Record<string, string> | null, prefLang: string | Array<string>) => {
  if (vbl == null) return ""
  if (!Array.isArray(prefLang)) prefLang = [prefLang]
  // DONE: language preference list
  for (const pL of prefLang) {
    if (pL in vbl) return vbl[pL]
    if (pL === "bo" && "bo-x-ewts" in vbl) {
      return fromWylie(vbl["bo-x-ewts"])
    }
    if (pL === "en") for (const k of Object.keys(vbl)) if (k.endsWith("-x-ewts") || k.endsWith("-x-iast")) return vbl[k]
  }
  if ("en" in vbl) return vbl["en"]

  const vals = Object.values(vbl)
  if (vals[0]) return vals[0]

  return ""
}

export type Lang = {
  value: string
  keyboard?: string[]
}

export const langs: Array<Lang> = [
  { value: "bo-x-ewts" },
  { value: "bo" },
  { value: "en" },
  { value: "zh-hans" },
  { value: "zh-hant" },
  {
    value: "zh-Latn-pinyin",
    keyboard: [
      "Ā",
      "Á",
      "Ǎ",
      "À",
      "ā",
      "á",
      "ǎ",
      "à",
      "Ē",
      "É",
      "Ě",
      "È",
      "ē",
      "é",
      "ě",
      "è",
      "Ī",
      "Í",
      "Ǐ",
      "Ì",
      "ī",
      "í",
      "ǐ",
      "ì",
      "Ō",
      "Ó",
      "Ǒ",
      "Ò",
      "ō",
      "ó",
      "ǒ",
      "ò",
      "Ū",
      "Ú",
      "Ǔ",
      "Ù",
      "ū",
      "ú",
      "ǔ",
      "ù",
    ],
  },
  { value: "sa-x-iast", keyboard: "ā Ā ī Ī ū Ū ṛ Ṛ ṝ Ṝ ḷ Ḷ ḹ Ḹ ṃ Ṃ ḥ Ḥ ṭ Ṭ ḍ Ḍ ṅ Ṅ ṅ Ṅ ṇ Ṇ ś Ś ṣ Ṣ".split(/ +/) },
]

// a little memoization

const cache: Record<string, Lang[]> = {}

export const langsWithDefault = (defaultLanguage: string): Array<Lang> => {
  if (defaultLanguage in cache) return cache[defaultLanguage]
  let res = langs.filter((l) => l.value === defaultLanguage)
  if (res === []) {
    debug("can't find defaultLanguage " + defaultLanguage + " in languages")
    return langs
  }
  res = res.concat(langs.filter((l) => l.value !== defaultLanguage))
  cache[defaultLanguage] = res
  return res
}
