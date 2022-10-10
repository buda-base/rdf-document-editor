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

export interface EditorProps extends RouteComponentProps<IdTypeParams> {}
