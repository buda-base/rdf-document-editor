
import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import "../public/app.css"

import * as ns from "./helpers/rdf/ns"
import * as shapes from "./helpers/rdf/shapes"

import enTranslations from "./translations/en"

const numtobodic: Record<string, string> = {
  "0": "༠",
  "1": "༡",
  "2": "༢",
  "3": "༣",
  "4": "༤",
  "5": "༥",
  "6": "༦",
  "7": "༧",
  "8": "༨",
  "9": "༩",
}

const numtobo = function (cstr: string): string {
  let res = ""
  for (const ch of cstr) {
    if (numtobodic[ch]) res += numtobodic[ch]
    else res += ch
  }
  return res
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
      format: function (value, format, lng) {
        if (format === "counttobo") {
          return numtobo("" + value)
        } else if (format === "counttozh" && value) {
          return value.toLocaleString("zh-u-nu-hanidec")
        } else if (format === "lowercase") return value.toLowerCase()
        else if (format === "uppercase") return value.toUpperCase()
        return value
      },
    },
  })

export { ns, shapes }

export { default as EntityEditContainer, EntityEditContainerMayUpdate } from "./containers/EntityEditContainer"
export { default as NewEntityContainer } from "./containers/NewEntityContainer"
export { default as EntityCreationContainer, EntityCreationContainerRoute } from "./containers/EntityCreationContainer"
export { default as EntityShapeChooserContainer } from "./containers/EntityShapeChooserContainer"
export type { IdTypeParams } from "./helpers/editor_props"

export { NodeShape, generateSubnode } from "./helpers/rdf/shapes"

export type { default as RDEConfig, LocalEntityInfo, IFetchState } from "./helpers/rde_config"

export { fetchTtl } from "./helpers/rdf/io"

export { RDFResource, Subject, LiteralWithId, EntityGraph, ExtRDFResourceWithLabel } from "./helpers/rdf/types"

export type { Entity } from "./atoms/common"

export { default as BUDAResourceSelector } from "./containers/BUDAResourceSelector"

export { ValueByLangToStrPrefLang } from "./helpers/lang"
export type { Lang } from "./helpers/lang"
