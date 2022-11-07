import "../public/app.css"

import * as ns from "./helpers/rdf/ns"
import * as shapes from "./helpers/rdf/shapes"
import * as atoms from "./atoms/common"

import enTranslations from "./translations/en"

export { ns, shapes, atoms, enTranslations }

export { default as EntityEditContainer, EntityEditContainerMayUpdate } from "./containers/EntityEditContainer"
export { default as NewEntityContainer } from "./containers/NewEntityContainer"
export { default as EntityCreationContainer, EntityCreationContainerRoute } from "./containers/EntityCreationContainer"
export { default as EntityShapeChooserContainer } from "./containers/EntityShapeChooserContainer"
export { default as EntitySelectorContainer } from "./containers/EntitySelectorContainer"
export { default as BottomBarContainer } from "./containers/BottomBarContainer"
export type { RDEProps, IdTypeParams } from "./helpers/editor_props"

export { NodeShape, generateSubnodes } from "./helpers/rdf/shapes"

export type { default as RDEConfig, LocalEntityInfo, IFetchState } from "./helpers/rde_config"

export type { HistoryStatus } from "./helpers/rdf/types"

export { fetchTtl } from "./helpers/rdf/io"

export { RDFResource, Subject, LiteralWithId, EntityGraph, ExtRDFResourceWithLabel, RDFResourceWithLabel, getHistoryStatus, updateHistory, history } from "./helpers/rdf/types"

export type { Entity } from "./atoms/common"

export { default as BUDAResourceSelector } from "./containers/BUDAResourceSelector"

export { ValueByLangToStrPrefLang } from "./helpers/lang"
export type { Lang } from "./helpers/lang"
