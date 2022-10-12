import {
  RouteComponentProps,
} from "react-router-dom"

export interface IdTypeParams {
  shapeQname: string
  entityQname: string
  subjectQname?: string
  propertyQname?: string
  index?: string
  subnodeQname?: string
}

export interface ExtendedParams {
  shapeQname: string
  entityQname: string
  subjectQname: string
  propertyQname: string
  index?: string
  subnodeQname?: string
}

export interface RDEProps extends RouteComponentProps<IdTypeParams> { copy?: string | null | (string|null)[] }

export interface RDEExtendedProps extends RouteComponentProps<IdTypeParams> { copy?: string | null | (string|null)[] }
