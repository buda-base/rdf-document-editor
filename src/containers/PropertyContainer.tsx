import React, { useState, FC } from "react"
import { RDFResource, Subject, LiteralWithId, ObjectType } from "../helpers/rdf/types"
import { PropertyShape, NodeShape } from "../helpers/rdf/shapes"
import RDEConfig from "../helpers/rde_config"
import { uiLangState } from "../atoms/common"
import * as lang from "../helpers/lang"
import { atom, useRecoilState, atomFamily } from "recoil"
import ValueList from "./ValueList"
import * as rdf from "rdflib"

const debug = require("debug")("rde:entity:property")
