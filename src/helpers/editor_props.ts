
import RDEConfig from "./rde_config"

export interface IdTypeParams {
  config: RDEConfig
  shapeQname?: string
  entityQname?: string
  subjectQname?: string
  propertyQname?: string
  index?: number
  subnodeQname?: string
}

export interface ExtendedParams {
  shapeQname: string
  entityQname: string
  subjectQname: string
  propertyQname: string
  index?: number
  subnodeQname?: string
}

export interface RDEProps extends IdTypeParams {
  extraElement?: JSX.Element | Iterable<JSX.Element>
  copy?: string | null | (string|null)[] 
  isEtext?:boolean
}

export interface RDEExtendedProps extends IdTypeParams { copy?: string | null | (string|null)[] }
