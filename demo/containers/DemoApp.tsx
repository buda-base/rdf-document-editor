import React, { useEffect, useRef, useState, useCallback } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { Redirect } from "react-router-dom"

import { Subject } from "../atoms/types"
import { demoAtom, userIdState, initListAtom, RIDprefixState, reloadProfileState } from "../atoms/common"
import { ShapeFetcher, EntityFetcher, demoUser } from "../helpers/rdf/io"
import * as shapes from "../helpers/rdf/shapes"
import * as ns from "../helpers/rdf/ns"
import { entitiesAtom } from "./EntitySelectorContainer"

const debug = require("debug")("rde:demo")

export const demoUserId = "bdu:U0DEMO01"

export default function DemoContainer(props) {
  const unmounting = { val: false }

  const [demo, setDemo] = useRecoilState(demoAtom)
  const [reloadProfile, setReloadProfile] = useRecoilState(reloadProfileState)
  const [userId, setUserId] = useRecoilState(userIdState)

  useEffect(() => {
    debug("init demo")
    if (!unmounting.val) {
      setDemo(true)
      setReloadProfile(true)
    }

    return () => {
      unmounting.val = true
    }
  }, [])

  if (demoUserId === userId) return <Redirect to="/" />
  return <div></div>
}

/* // cant' use ttl at all... EntityGraphValues keeps being empty (unless we start displaying/editing its values) 

  const { shapeLoadingState, shape } = ShapeFetcher("bds:UserProfileShape", demoUserId)

  if (!shape) return <div></div>

  return <DemoContainerWithShape {...props} shape={shape} />
}

function DemoContainerWithShape(props) {
  const unmounting = { val: false }

  const { entityLoadingState, entity } = EntityFetcher(demoUserId, props.shape, unmounting)

  const [userId, setUserId] = useRecoilState(userIdState)

  const demoUserPrefix = useRecoilValue(entity.getAtomForProperty(ns.SKOS("prefLabel").value)) //ns.BDOU("localNameDefaultPrefix").value))

  debug("entity:", entity, demoUserPrefix)

  useEffect(() => {
    return () => {
      unmounting.val = true
    }
  }, [])
  
  useEffect(() => {    
    if(!unmounting.val) setUserId(demoUserId)
  }, [entity])
 
  if (demoUserId === userId) return <Redirect to="/" />
  else return <div></div>
}
*/
