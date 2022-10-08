
export type Lang = {
  value: string
  keyboard?: string[]
}


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
