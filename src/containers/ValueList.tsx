import React, { useEffect, FC, ChangeEvent, useState, useRef, useLayoutEffect, useCallback, useMemo } from "react"
import * as rdf from "rdflib"
import {
  LiteralWithId,
  Subject,
  Value,
  ObjectType,
  RDFResource,
  RDFResourceWithLabel,
  ExtRDFResourceWithLabel,
  errors,
  noneSelected,
  getHistoryStatus,
} from "../helpers/rdf/types"
import { generateSubnodes, NodeShape, PropertyShape } from "../helpers/rdf/shapes"
import * as ns from "../helpers/rdf/ns"
import { useRecoilState, useRecoilValue } from "recoil"
import { TextField, MenuItem, Tooltip } from "@mui/material"
import { AddCircleOutline as AddCircleOutlineIcon, RemoveCircleOutline as RemoveCircleOutlineIcon, Error as ErrorIcon, 
  Close as CloseIcon, Visibility as VisibilityIcon, FormatBold as MDIcon, More as Label, 
  Edit as EditIcon, Keyboard as KeyboardIcon, Help as HelpIcon  } from '@mui/icons-material';
import i18n from "i18next"
import { ValueByLangToStrPrefLang, langsWithDefault } from "../helpers/lang"
import RDEConfig from "../helpers/rde_config"
import {
  reloadEntityState,
  uiTabState,
  uiLangState,
  uiLitLangState,
  uiEditState,
  uiUndosState,
  orderedByPropSelector,
  orderedByPropSelectorArgs,
  initListAtom,
  RIDprefixState,
  orderedNewValSelector,
  ESfromRecoilSelector,
  isUniqueTestSelector,
  orderedNewValSelectorType,
  isUniqueTestSelectorType,
  initStringAtom,
  entitiesAtom,
  EditedEntityState,
} from "../atoms/common"

import MDEditor, { commands } from "@uiw/react-md-editor"
import { debug as debugfactory } from "debug"

const debug = debugfactory("rde:entity:container:ValueList")

function replaceItemAtIndex(arr: Value[], index: number, newValue: Value): Value[] {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)]
}

function removeItemAtIndex(arr: Value[], index: number): Value[] {
  return [...arr.slice(0, index), ...arr.slice(index + 1)]
}

export const PropertyContainer: FC<{
  property: PropertyShape
  subject: Subject
  embedded?: boolean
  force?: boolean
  editable: boolean
  owner?: Subject
  topEntity?: Subject
  shape: NodeShape
  siblingsPath?: string
  config: RDEConfig
}> = ({ property, subject, embedded, force, editable, owner, topEntity, shape, siblingsPath, config }) => {
  //debug("propertyCtn:", property.qname, property, subject.qname, subject, siblingsPath)

  const [css, setCss] = useState("")

  const setCssClass = (txt: string, add = true) => {
    if (add) {
      if (!css.includes(txt)) setCss(css + txt + " ")
    } else {
      if (css.includes(txt)) setCss(css.replace(new RegExp(txt), ""))
    }
  }

  return (
    <React.Fragment>
      <div role="main" {...(css ? { className: css } : {})}>
        <section className="album">
          <div
            className={"container" + (embedded ? " px-0" : "") + " editable-" + editable}
            style={{ border: "dashed 1px none" }}
          >
            <ValueList
              subject={subject}
              property={property}
              embedded={embedded}
              force={force}
              editable={editable}
              {...(owner ? { owner } : {})}
              {...(topEntity ? { topEntity } : {})}
              shape={shape}
              siblingsPath={siblingsPath}
              setCssClass={setCssClass}
              config={config}
            />
          </div>
        </section>
      </div>
    </React.Fragment>
  )
}

export const MinimalAddButton: FC<{
  add: (e: React.MouseEvent<HTMLButtonElement>, n: number) => Promise<void>
  className: string
  disable?: boolean
}> = ({ add, className, disable }) => {
  return (
    <div
      className={
        "minimalAdd " + "disable_" + disable + (className !== undefined ? className : " text-right")
      } /*style={{ width: "100%" }}*/
    >
      <button
        className="btn btn-link ml-2 px-0"
        onClick={(ev: React.MouseEvent<HTMLButtonElement>) => add(ev, 1)}
        {...(disable ? { disabled: true } : {})}
      >
        <AddCircleOutlineIcon />
      </button>
    </div>
  )
}

export const BlockAddButton: FC<{
  add: (e: React.MouseEvent<HTMLButtonElement>, n: number) => void
  label?: string
  count: number
}> = ({ add, label, count = 1 }) => {
  const [n, setN] = useState(1)
  const [disable, setDisable] = useState(false)

  /* // TODO: disable batch operations in demo mode 
  const [demo, setDemo] = useRecoilState(demoAtom)

  // #36 disable batch add in demo mode
  useEffect(() => {
    if (count > 1 && demo && !disable) setDisable(true)
  })
  */

  return (
    <>
    <div
      className="blockAdd text-center pb-1 mt-3"
      style={{ width: "100%", ...count > 1 ? { display: "flex" } : {} }}
    >
      <button
        className="btn btn-sm btn-block btn-outline-primary px-0"
        style={{
          boxShadow: "none",
          pointerEvents: disable ? "none" : "auto",
          ...disable ? { opacity: 0.5, pointerEvents: "none" } : {},
        }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => add(e, n)}
        //disabled={disable}
      >
          {i18n.t("general.add_another", { val: label, count })}
          &nbsp;
          <AddCircleOutlineIcon/>
      </button>
      {count > 1 && (
        <TextField
          variant="standard"
          label={<>{i18n.t("general.add_nb", { val: label })}</>}
          style={{ width: 200 }}
          value={n}
          className="ml-2"
          type="number"
          InputLabelProps={{ shrink: true }}
          onChange={(e) => setN(Number(e.target.value))}
          InputProps={{ inputProps: { min: 1, max: 500 } }}
        />
      )}
    </div>
    </>
  )
}

export const OtherButton: FC<{ onClick: React.MouseEventHandler<HTMLButtonElement>; label: string }> = ({
  onClick,
  label,
}) => {
  return (
    <>
    <div className="blockAdd text-center pb-1" style={{ margin: "0 15px" }}>
      <button
        className="btn btn-sm btn-block btn-outline-primary mb-2 px-0 py-2"
        style={{ boxShadow: "none" }}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
    </>
  )
}

const generateDefault = async (
  property: PropertyShape,
  parent: Subject,
  RIDprefix: string | null,
  idToken: string | null,
  val = "",
  config: RDEConfig
): Promise<Value | Value[]> => {
  //debug("genD:", property, parent)
  switch (property.objectType) {
    case ObjectType.ResExt:
      // TODO might be a better way but "" isn't authorized
      return new ExtRDFResourceWithLabel("tmp:uri", {}, {}, null, config.prefixMap)
      break
    case ObjectType.Internal:
      if (property.targetShape == null) throw "no target shape for " + property.uri
      return generateSubnodes(property.targetShape, parent) //, RIDprefix, idToken) //, n)
      break
    case ObjectType.ResInList:
      // DONE: fix save (default value for select like bdo:material)
      if (property.defaultValue) return new ExtRDFResourceWithLabel(property.defaultValue.value, {}, {}, null, config.prefixMap)
      // if a select property is not required, we don't select anything by default
      if (!property.minCount) return noneSelected
      // else we select the first one automatically
      const propIn: Array<Value> | null = property.in
      if (!propIn) throw "can't find a list for " + property.uri
      return propIn[0]
      break
    case ObjectType.LitInList:
      const defaultValueLiL = property.defaultValue as rdf.Literal | null
      if (defaultValueLiL !== null)
        return new LiteralWithId(defaultValueLiL.value, defaultValueLiL.language, defaultValueLiL.datatype)
      if (!property.minCount) {
        const datatype = property.datatype?.value
        if (datatype === ns.RDF("langString").value) {
          // TODO: this should be a user preference, not urgent
          return new LiteralWithId("", property?.defaultLanguage ? property.defaultLanguage : "bo-x-ewts")
        } else {
          return new LiteralWithId("", null, property.datatype ? property.datatype : undefined)
        }
      }
      const propInLit: Array<Value> | null = property.in
      if (!propInLit) throw "can't find a list for " + property.uri
      return propInLit[0]
      break
    case ObjectType.Literal:
    default:
      const defaultValue = property.defaultValue as rdf.Literal | null
      //debug("default:", property.qname, defaultValue)
      if (defaultValue !== null)
        return new LiteralWithId(defaultValue.value, defaultValue.language, defaultValue.datatype)
      const datatype = property.datatype?.value
      if (datatype === ns.RDF("langString").value) {
        // TODO: this should be a user preference, not urgent
        return new LiteralWithId("", property?.defaultLanguage ? property.defaultLanguage : "bo-x-ewts")
      } else if (datatype === ns.XSD("integer").value) {
        return new LiteralWithId(val, null, property.datatype ? property.datatype : undefined)
      } else {
        return new LiteralWithId("", null, property.datatype ? property.datatype : undefined)
      }
      break
  }
}

/**
 * List component
 */

const ValueList: FC<{
  subject: Subject
  property: PropertyShape
  embedded?: boolean
  force?: boolean
  editable: boolean
  owner?: Subject
  topEntity?: Subject
  shape: NodeShape
  siblingsPath?: string
  setCssClass?: (s: string, add: boolean) => void
  config: RDEConfig
}> = ({ subject, property, embedded, force, editable, owner, topEntity, shape, siblingsPath, setCssClass, config }) => {
  if (property.path == null) throw "can't find path of " + property.qname
  const [unsortedList, setList] = useRecoilState(subject.getAtomForProperty(property.path.sparqlString))
  const [uiLang] = useRecoilState(uiLangState)
  const [idToken, setIdToken] = useState(localStorage.getItem("BLMPidToken"))
  const [RIDprefix, setRIDprefix] = useRecoilState(RIDprefixState)
  const propLabel = ValueByLangToStrPrefLang(property.prefLabels, uiLang)
  const helpMessage = ValueByLangToStrPrefLang(property.helpMessage, uiLang)
  const [undos, setUndos] = useRecoilState(uiUndosState)

  const sortOnPath = property?.sortOnProperty?.value
  const orderedList: Value[] = useRecoilValue(
    orderedByPropSelector({
      atom: subject.getAtomForProperty(property.path.sparqlString),
      propertyPath: sortOnPath || "",
      //order: "desc" // default is "asc"
    } as orderedByPropSelectorArgs)
  )
  let list: Value[] = unsortedList
  //debug("list", list)
  if (orderedList.length) list = orderedList
  if (list === undefined)
    list = []

  const withOrder = shape.properties.filter((p) => p.sortOnProperty?.value === property.path?.sparqlString)
  let newVal: string | number = useRecoilValue(
    orderedNewValSelector({
      atom:
        withOrder.length && withOrder[0].path
          ? (topEntity ? topEntity : subject).getAtomForProperty(withOrder[0].path.sparqlString)
          : null,
      propertyPath: property.path.sparqlString,
      //order: "desc" // default is "asc"
    } as orderedNewValSelectorType)
  )
  if (newVal != "") {
    const newValNum = Number(newVal)
    if (property.minInclusive && newValNum < property.minInclusive) newVal = property.minInclusive.toString()
    if (property.maxInclusive && newValNum > property.maxInclusive) newVal = property.maxInclusive.toString()
  }

  const [getESfromRecoil, setESfromRecoil] = useRecoilState(ESfromRecoilSelector({}))
  const updateEntityState = (status: EditedEntityState, id: string, removingFacet = false, forceRemove = false) => {
    if (id === undefined) throw new Error("id undefined")
    const entityQname = topEntity ? topEntity.qname : subject.qname
    const undo = undos[config.prefixMap.uriFromQname(entityQname)]
    const hStatus = getHistoryStatus(config.prefixMap.uriFromQname(entityQname))
    //debug("undo:", undo, hStatus, history, entityQname, undos)

    setESfromRecoil({ property, subject, entityQname, undo, hStatus, status, id, removingFacet, forceRemove })
  }

  const alreadyHasEmptyValue: () => boolean = (): boolean => {
    if (!list) return false
    for (const val of list) {
      if (val instanceof LiteralWithId && val.value === "") return true
      if (val instanceof RDFResourceWithLabel && val.node.value === "tmp:none") return true
    }
    return false
  }

  // TODO: handle the creation of a new value in a more sophisticated way (with the iframe and such)
  const canAdd =
    !editable ||
    alreadyHasEmptyValue() ||
    property.readOnly && property.readOnly === true ||
    property.displayPriority && property.displayPriority > 1
      ? false
      : property.objectType != ObjectType.ResExt && property.maxCount
        ? list.length < property.maxCount
        : true

  const canDel = (!property.minCount || property.minCount < list.length) && !property.readOnly && editable

  // DONE save multiple external resource for property
  const onChange: (value: RDFResourceWithLabel, idx: number, removeFirst: boolean | undefined) => void = (
    value: RDFResourceWithLabel,
    idx: number,
    removeFirst: boolean | undefined
  ) => {
    const newList = replaceItemAtIndex(list, idx, value)
    //if(removeFirst) newList.shift()
    setList(newList)
  }

  // DONE prevent adding same resource twice
  const exists = useCallback(
    (uri: string) => {
      //debug("set exists",list)
      //debug("exists?", uri, list)
      for (const val of list) {
        if (val instanceof RDFResourceWithLabel && (val.qname === uri || val.uri === uri)) {
          //debug("found " + uri + " in ", list)
          return true
        }
      }
      //debug("not found " + uri + " in ", list)
      return false
    },
    [list]
  )

  let firstValueIsEmptyField = true

  const setListAsync = useCallback(async (pre = false, vals:Value[] = [], solo = false) => {
    const res = await generateDefault(property, subject, RIDprefix, idToken, newVal.toString(), config)
    // dont store empty value autocreation
    if (topEntity) topEntity.noHisto()
    else if (owner) owner.noHisto()
    else subject.noHisto()
    //debug("setNoH:1a",subject,owner,topEntity)
    if(solo) setList(Array.isArray(res) ? res : [res])
    else if(vals.length) setList(vals.concat(Array.isArray(res) ? res : [res]))
    else if(pre) setList((oldList) => (Array.isArray(res) ? res : [res]).concat(oldList));
    else setList((oldList = []) => oldList.concat(Array.isArray(res) ? res : [res]));
  }, [property, subject, RIDprefix, idToken, newVal, config, topEntity, owner, setList])

  useEffect(() => {
    //debug("vL/effect:",subject.qname,property.qname,list)

    // DONE: check maxCount
    if (list.length && (!property.maxCount || property.maxCount > list.length)) {
      const first = list[0]
      if (first instanceof ExtRDFResourceWithLabel && first.uri !== "tmp:uri" && first.uri !== "tmp:none")
        firstValueIsEmptyField = false
    }

    // reinitializing the property values atom if it hasn't been initialized yet
    const vals: Array<Value> | null = subject.getUnitializedValues(property)
    debug("got uninitialized values for property ", property, vals)
    if (vals && vals.length) {
      if (property.minCount && vals.length < property.minCount 
        && (!property.maxCount || property.maxCount > list.length)) {        
        setListAsync(undefined, vals)
      } else {
        //debug("setNoH:1b",subject,owner,topEntity)
        debug("set list on atom")
        setList(vals)
      }
    } else if (
      property.objectType != ObjectType.ResInList &&
      property.objectType != ObjectType.LitInList &&
      property.objectType != ObjectType.Internal &&
      (!property.displayPriority ||
        property.displayPriority === 0 ||
        property.displayPriority === 1 && (list.length || force)) &&
      (property.minCount && list.length < property.minCount || !list.length || !firstValueIsEmptyField) &&
      (!property.maxCount || property.maxCount > list.length)
    ) {
      if (!firstValueIsEmptyField) {        
        setListAsync(true)
      } else {
        setListAsync(false)
      }
    } else if (property.objectType == ObjectType.Internal && property.minCount && list.length < property.minCount
      && (!property.maxCount || property.maxCount > list.length)) {
      
      setListAsync(true)
    } else if (
      property.objectType != ObjectType.ResInList &&
      property.objectType != ObjectType.LitInList &&
      property.displayPriority &&
      property.displayPriority === 1 &&
      list.length === 1 &&
      !force
    ) {
      //debug("setNoH:4",subject,owner,topEntity)
      // DONE: comment: what does it do?
      // guess: it removes the first tmp:uri first object of hidden properties
      // answer: indeed it removes empty value when displayPriority is 1
      // but let's keep value then hide it in CSS when needed (fixes #16)
      // if (firstValueIsEmptyField) setList([])
    } else if (
      !list.length &&
      (property.objectType == ObjectType.ResInList || property.objectType == ObjectType.LitInList)
    ) {
      // this makes sure that there's at least one value for select forms, and the value is either
      // the first one (when it's mandatory that there's a value), or tmp:none
      setListAsync(false, undefined, true)
    }
    //debug("end/vL/effect")
  }, [subject, list, force])

  let addBtn = property.objectType === ObjectType.Internal

  //debug("prop:", property.qname, subject.qname, list) //property, force)

  const isEmptyValue = (val: Value): boolean => {
    if (val instanceof RDFResourceWithLabel) {
      return val.uri === "tmp:uri" || val.uri === "tmp:none"
    } else if (val instanceof LiteralWithId) {
      // remove language part to fix hiding secondary properties in iinstance/volumes
      return val.value === "" // && !val.language
      //|| property.defaultValue === "bds:ImagegroupShape-volumePagesTbrcIntro" && val.value === "0" // no need
    }
    return false
  }
  const isErrorValue = (val: Value): boolean => {
    // TODO: to be continue (or not? conflicts with hiding secondary properties, removing)
    //       + not sure it should be hidden (in case of empty Person Name) but Names group should not be closed as well
    //if (val instanceof LiteralWithId && property?.datatype?.value === ns.RDF("langString").value) return !val.value

    if (val instanceof LiteralWithId && errors[topEntity ? topEntity.qname : subject.qname]) {
      const errorKeys = Object.keys(errors[topEntity ? topEntity.qname : subject.qname])
      return errorKeys.some((k) => k.endsWith(";" + val.id))
    }

    return false
  }

  const hasNonEmptyValue = list.some((v) => !isEmptyValue(v) || isErrorValue(v))

  useEffect(() => {
    if (setCssClass) {
      if (!hasNonEmptyValue) setCssClass("unset", true)
      else setCssClass("unset", false)
    }
  }, [hasNonEmptyValue])

  /* eslint-disable no-magic-numbers */
  const showLabel =
    !property.displayPriority ||
    property.displayPriority === 0 ||
    property.displayPriority === 1 && (force || list.length > 1 || hasNonEmptyValue) ||
    property.displayPriority === 2 && (list.length >= 1 || hasNonEmptyValue)

  // scroll back to top when loosing focus
  const scrollElem = useRef<null | HTMLDivElement>(null)
  const [edit, setEdit] = useRecoilState(uiEditState)
  useEffect(() => {
    if (property?.group?.value !== edit && scrollElem?.current) {
      scrollElem.current.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }
  }, [edit])

  const hasEmptyExtEntityAsFirst =
    list.length > 0 &&
    list[0] instanceof RDFResourceWithLabel &&
    property.objectType == ObjectType.ResExt &&
    list[0].uri === "tmp:uri"

  const titleCase = (s: string) => {
    if (!s) return s
    return s[0].toUpperCase() + s.substring(1)
  }

  const canPush = property.allowPushToTopLevelLabel

  const isUniqueValueAmongSiblings = useRecoilValue(
    isUniqueTestSelector({
      checkUnique: property.uniqueValueAmongSiblings,
      siblingsAtom: siblingsPath ? (owner ? owner : subject).getAtomForProperty(siblingsPath) : initListAtom,
      propertyPath: property.path.sparqlString,
    } as isUniqueTestSelectorType)
  )

  // see https://stackoverflow.com/questions/55026139/whats-the-difference-between-usecallback-with-an-empty-array-as-inputs-and-u
  const renderListElem = (val: Value, i: number, nbvalues: number) => {
      //debug("render:", property.qname, isUniqueValueAmongSiblings, property, val, i, Object.keys(config?.prefixMap?.prefixToURI))

      if (
        val instanceof RDFResourceWithLabel ||
        property.objectType == ObjectType.ResInList ||
        property.objectType == ObjectType.LitInList
      ) {
        if (property.objectType == ObjectType.ResExt)
          return (
            <ExtEntityComponent
              key={val.id + ":" + i}
              subject={subject}
              property={property}
              extRes={val as ExtRDFResourceWithLabel}
              canDel={canDel && (i > 0 || !(val instanceof LiteralWithId) && val.uri !== "tmp:uri")}
              onChange={onChange}
              idx={i}
              exists={exists}
              editable={editable}
              {...(owner ? { owner } : {})}
              title={titleCase(propLabel)}
              updateEntityState={updateEntityState}
              shape={shape}
              config={config}
            />
          )
        else if (val instanceof LiteralWithId || val instanceof RDFResourceWithLabel) {
          addBtn = false
          // eslint-disable-next-line no-extra-parens
          const canSelectNone = (i == 0 && !property.minCount) || (i > 0 && i == nbvalues - 1)
          return (
            <SelectComponent
              key={"select_" + val.id + "_" + i}
              canSelectNone={canSelectNone}
              subject={subject}
              property={property}
              res={val}
              selectIdx={i}
              canDel={canDel && val != noneSelected}
              editable={editable}
              create={
                canAdd ? (
                  <Create
                    subject={subject}
                    property={property}
                    embedded={embedded}
                    newVal={Number(newVal)}
                    shape={shape}
                    config={config}
                  />
                ) : undefined
              }
              updateEntityState={updateEntityState}
            />
          )
        }
      } else if (val instanceof Subject) {
        addBtn = true
        return (
          <FacetComponent
            key={val.id}
            subject={subject}
            property={property}
            subNode={val}
            canDel={canDel && editable}
            {...(force ? { force } : {})}
            editable={editable}
            {...(topEntity ? { topEntity } : { topEntity: subject })}
            updateEntityState={updateEntityState}
            shape={shape}
            config={config}
          />
        )
      } else if (val instanceof LiteralWithId) {
        addBtn = false
        const isUniqueLang = list.filter((l) => l instanceof LiteralWithId && l.language === val.language).length === 1

        return (
          <LiteralComponent
            key={val.id}
            subject={subject}
            property={property}
            lit={val}
            {...{ canDel, isUniqueLang, isUniqueValueAmongSiblings }}
            create={
              <Create
                disable={!canAdd || !(val && val.value !== "")}
                subject={subject}
                property={property}
                embedded={embedded}
                newVal={Number(newVal)}
                shape={shape}
                config={config}
              />
            }
            editable={editable}
            topEntity={topEntity}
            updateEntityState={updateEntityState}
            config={config}
          />
        )
      }
    }

  return (
    <React.Fragment>
      <div
        className={
          "ValueList " +
          (property.maxCount && property.maxCount < list.length ? "maxCount" : "") +
          (hasNonEmptyValue ? "" : "empty") +
          (property.objectType === ObjectType.ResExt ? " ResExt" : "") +
          (embedded ? "" : " main") +
          (canPush ? " canPush" : "")
        }
        data-priority={property.displayPriority ? property.displayPriority : 0}
        role="main"
        style={{
          display: "flex",
          flexWrap: "wrap",
          ...list.length > 1 && firstValueIsEmptyField && property.path.sparqlString !== ns.SKOS("prefLabel").value
            ? {
                /*borderBottom: "2px solid #eee", paddingBottom: "16px"*/
              }
            : {},
        }}
      >
        {showLabel && (!property.in || property.in.length > 1) && (
          <label
            className={"propLabel"}
            data-prop={property.qname}
            data-type={property.objectType}
            data-priority={property.displayPriority}
          >
            {titleCase(propLabel)}
            {helpMessage && property.objectType === ObjectType.ResExt && (
              <Tooltip title={helpMessage}>
                <HelpIcon className="help label" />
              </Tooltip>
            )}
          </label>
        )}
        {hasEmptyExtEntityAsFirst && <div style={{ width: "100%" }}>{renderListElem(list[0], 0, list.length)}</div>}
        <div
          ref={scrollElem}
          className={!embedded && property.objectType !== ObjectType.Internal ? "overFauto" : ""}
          style={{
            width: "100%",
            //...!embedded && property.objectType !== ObjectType.Internal ? { maxHeight: "338px" } : {}, // overflow conflict with iframe...
            ...property?.group?.value !== edit ? { paddingRight: "0.5rem" } : {},
          }}
        >
          {list.map((val, i) => {
            if (!hasEmptyExtEntityAsFirst || i > 0) return renderListElem(val, i, list.length)
          })}
        </div>
      </div>
      {canAdd && addBtn && (
        <Create
          subject={subject}
          property={property}
          embedded={embedded}
          newVal={Number(newVal)}
          shape={shape}
          config={config}
        />
      )}
    </React.Fragment>
  )
}

type CreateComponentType = FC<{
  subject: Subject
  property: PropertyShape
  embedded?: boolean
  disable?: boolean
  newVal?: number
  shape?: NodeShape
  config: RDEConfig
}>

/**
 * Create component
 */
const Create: CreateComponentType = ({ subject, property, embedded, disable, newVal, shape, config }) => {
  if (property.path == null) throw "can't find path of " + property.qname
  const recoilArray = useRecoilState(subject.getAtomForProperty(property.path.sparqlString))
  let list = recoilArray[0]
  const setList = recoilArray[1] 
  if (list === undefined)
    list = []
  let collecNode: rdf.Collection | null = null
  if (list.length === 1 && list[0] instanceof RDFResource && list[0].node && list[0].node instanceof rdf.Collection) {
    collecNode = list[0].node
  }
  const collec: any[] | undefined = collecNode?.termType === "Collection" ? collecNode?.elements : undefined
  const listOrCollec = collec ? collec : list
  const [uiLang] = useRecoilState(uiLangState)
  const [entities, setEntities] = useRecoilState(entitiesAtom)
  const [uiTab] = useRecoilState(uiTabState)
  const entity = entities.findIndex((e, i) => i === uiTab)
  const [edit, setEdit] = useRecoilState(uiEditState)
  const [idToken, setIdToken] = useState(localStorage.getItem("BLMPidToken"))
  const [RIDprefix, setRIDprefix] = useRecoilState(RIDprefixState)

  let nextVal = useRecoilValue(
    property.sortOnProperty
      ? orderedNewValSelector({
          atom: property.sortOnProperty ? subject.getAtomForProperty(property.path.sparqlString) : null,
          propertyPath: property.sortOnProperty.value,
          //order: "desc" // default is "asc"
        } as orderedNewValSelectorType)
      : initStringAtom
  )
  const sortProps = property.targetShape?.properties.filter(
    (p) => p.path?.sparqlString === property.sortOnProperty?.value
  )
  if (sortProps?.length) {
    const sortProp = sortProps[0]
    if (sortProp?.minInclusive != null && Number(nextVal) < sortProp.minInclusive)
      nextVal = sortProp.minInclusive.toString()
    if (sortProp?.maxInclusive != null && Number(nextVal) > sortProp.maxInclusive)
      nextVal = sortProp.maxInclusive.toString()
    //debug("create:",shape,nextVal,newVal,property.qname,property) //,subject.getAtomForProperty(property.path.sparqlString))
  }
  let waitForNoHisto = false

  const addItem = async (event: React.MouseEvent<HTMLButtonElement>, n: number) => {

    if (n > 1) {
      const subjects = await config.generateSubnodes(property.targetShape, subject, n)
      // stop rendering?
      setList([...listOrCollec, ...subjects])
      // render again?
      return
    }

    if (waitForNoHisto) return

    if (property.objectType === ObjectType.Internal) {
      waitForNoHisto = true
      subject.noHisto(false, 1) // allow parent node in history but default empty subnodes before tmp:allValuesLoaded
    }
    const item = await generateDefault(property, subject, RIDprefix, idToken, newVal?.toString(), config)
    setList([...listOrCollec, item]) //(oldList) => [...oldList, item])
    if (property.objectType === ObjectType.Internal && item instanceof Subject) {
      //setEdit(property.qname+item.qname)  // won't work...
      setImmediate(() => {
        // this must be "delayed" to work
        setEdit(subject.qname + " " + property.qname + " " + item.qname)
      })

      setTimeout(() => {
        subject.noHisto(false, false) // history back to normal
        waitForNoHisto = false
      }, 350) // *arbitrary long* delay during which add button can't be used
    }
  }

  //debug("path/type:", property.objectType, property.path.sparqlString, disable)

  if (
    property.objectType !== ObjectType.Internal &&
    (embedded ||
      property.objectType == ObjectType.Literal ||
      property.objectType == ObjectType.ResInList ||
      property.objectType == ObjectType.LitInList)
  )
    return (<MinimalAddButton disable={disable} add={addItem} className=" " />)
  else {
    const targetShapeLabels = property.targetShape?.targetClassPrefLabels
    const labels = targetShapeLabels ? targetShapeLabels : property.prefLabels
    const count = property.allowBatchManagement ? 2 : 1
    return (<BlockAddButton add={addItem} label={ValueByLangToStrPrefLang(labels, uiLang)} count={count} />)
  }
}

/**
 * Edit component
 */
const EditLangString: FC<{
  property: PropertyShape
  lit: LiteralWithId
  onChange: (value: LiteralWithId) => void
  label: React.ReactNode
  globalError?: string
  editable?: boolean
  updateEntityState: (status: EditedEntityState, id: string, removingFacet?: boolean, forceRemove?: boolean) => void
  entity: Subject
  index: number
  config: RDEConfig
}> = ({ property, lit, onChange, label, globalError, editable, updateEntityState, entity, index, config }) => {
  const [editMD, setEditMD] = useState(false)
  const [keyboard, setKeyboard] = useState(false)

  const canPushPrefLabel = property.allowPushToTopLevelLabel

  const getLangStringError = (val: string) => {
    let err = ""
    if (!val && property.minCount) err = i18n.t("error.empty")
    else if (globalError) err = globalError
    return err
  }

  const [error, setError] = useState<React.ReactNode | null>(null)

  //debug("val:", lit.id, lit.value, error, globalError)

  useEffect(() => {
    const newError = getLangStringError(lit.value)
    if (newError != error) {
      //debug("newE:",newError,error,errors,lit,lit.id)
      updateEntityState(newError ? EditedEntityState.Error : EditedEntityState.Saved, lit.id)
      setError(newError)
    }
  })

  useEffect(() => {
    return () => {
      // some not state-dependent flag to know entity we currently are
      const inOtherEntity = !window.location.href.includes("/" + entity.qname + "/")

      //debug("unmount", entity.qname, window.location.href, lit.id, errors, inOtherEntity)
      if (!inOtherEntity) updateEntityState(EditedEntityState.Saved, lit.id, false, !inOtherEntity)
    }
  }, [])

  const errorData = {
    helperText: (
      <React.Fragment>
        <ErrorIcon style={{ fontSize: "20px", verticalAlign: "-7px" }} />
        &nbsp;<i>{error}</i>
      </React.Fragment>
    ),
    error: true,
  }

  const [preview, setPreview] = useState<string | null>(null)
  useLayoutEffect(() => {
    if (document.activeElement === inputRef.current) {
      const { value, error } = config.previewLiteral(lit, uiLang)
      setPreview(value)
      setError(error)
    } else {
      setPreview(null)
    }
  })

  let padBot = "0px"
  if (preview) {
    padBot = "40px"
  } else if (property.singleLine && editMD) {
    padBot = "1px"
  }

  const codeEdit = { ...commands.codeEdit, icon: <EditIcon style={{ width: "12px", height: "12px" }} /> },
    codePreview = { ...commands.codePreview, icon: <VisibilityIcon style={{ width: "12px", height: "12px" }} /> }

  const hasKB = config.possibleLiteralLangs.filter((l) => l.value === lit.language)

  const inputRef = useRef<HTMLInputElement>()

  const keepFocus = () => {
    if (inputRef.current && document.activeElement != inputRef.current) inputRef.current.focus()
  }

  const insertChar = (str: string) => {
    if (inputRef.current) {
      const { selectionStart, selectionEnd, value } = inputRef.current
      //debug("input:", selectionStart, selectionEnd, value)
      const newValue =
        value.substring(0, selectionStart ? selectionStart : 0) + str + value.substring(selectionEnd ? selectionEnd : 0)
      onChange(lit.copyWithUpdatedValue(newValue))
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = (selectionStart ? selectionStart : 0) + str.length
          inputRef.current.selectionEnd = inputRef.current.selectionStart
        }
      }, 10)
    }
  }

  let prefLabelAtom = entity?.getAtomForProperty(ns.SKOS("prefLabel").value)
  if (!prefLabelAtom) prefLabelAtom = initListAtom
  const [prefLabels, setPrefLabels] = useRecoilState(prefLabelAtom)

  const [uiLang] = useRecoilState(uiLangState)

  const pushAsPrefLabel = () => {
    //debug("pL:",prefLabels,lit)
    let newPrefLabels: Value[] = [],
      found = false
    for (const l in prefLabels) {
      if (prefLabels[l] instanceof LiteralWithId) {
        const litWi = prefLabels[l] as LiteralWithId
        if (litWi.language === lit.language) {
          found = true
          newPrefLabels = replaceItemAtIndex(prefLabels, Number(l), lit)
          break
        }
      }
    }
    if (!found) newPrefLabels = [...prefLabels, lit.copy()]
    if (newPrefLabels.length) setPrefLabels(newPrefLabels)
  }

  return (
    <div
      className={"mb-0" + (preview ? " withPreview" : "")}
      style={{
        display: "flex",
        width: "100%",
        alignItems: "flex-end",
        paddingBottom: padBot,
        position: "relative",
      }}
    >
      {canPushPrefLabel && !error && !globalError && (
        <span className="canPushPrefLabel">
          <span onClick={pushAsPrefLabel}>
            <Tooltip key={lit.id} title={<>Use as the main name or title for this language</>}>
              <span className="img"></span>
            </Tooltip>
            <Label/>
          </span>
        </span>
      )}
      {(property.singleLine || !editMD) && (
        <div style={{ width: "100%", position: "relative" }}>
          <TextField
            variant="standard"
            inputRef={inputRef}
            className={lit.language === "bo" ? " lang-bo" : ""}
            label={label}
            style={{ width: "100%" }}
            value={lit.value}
            multiline={!property.singleLine}
            InputLabelProps={{ shrink: true }}
            inputProps={{ spellCheck: "true", lang: lit.language === "en" ? "en_US" : lit.language }}
            onChange={(e) => {
              const newError = getLangStringError(lit.value)
              if (newError && error != newError) setError(newError)
              else updateEntityState(newError ? EditedEntityState.Error : EditedEntityState.Saved, lit.id)
              onChange(lit.copyWithUpdatedValue(e.target.value))
            }}
            {...(error ? errorData:{})}
            {...(!editable ? { disabled: true } : {})}
            onFocus={() => {
              const { value, error } = config.previewLiteral(lit, uiLang)
              setPreview(value)
              setError(error)
            }}
            onBlur={() => {
              setPreview(null)
              setTimeout(() => {
                if (inputRef.current && document.activeElement != inputRef.current) setKeyboard(false)
              }, 350)
            }}
          />
          {property.allowMarkDown && (
            <span
              className={"opaHover"}
              style={{ position: "absolute", right: 0, top: 0, fontSize: "0px" }}
              onClick={() => setEditMD(!editMD)}
            >
              {!editMD && <MDIcon style={{ height: "16px" }} />}
              {editMD && <MDIcon style={{ height: "16px" }} />}
            </span>
          )}
          {hasKB.length > 0 && hasKB[0].keyboard && (
            <span
              onClick={() => {
                setKeyboard(!keyboard)
                keepFocus()
              }}
              className={"opaHover " + (keyboard ? "on" : "")}
              style={{
                position: "absolute",
                right: 0,
                top: "0px",
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <KeyboardIcon />
            </span>
          )}
          {hasKB.length > 0 && hasKB[0].keyboard && keyboard && (
            <div className="card px-2 py-2 hasKB" style={{ display: "block", width: "405px" }} onClick={keepFocus}>
              {hasKB[0].keyboard.map((k, i) => (
                <span
                  key={i}
                  className="card mx-1 my-1"
                  style={{
                    display: "inline-flex",
                    width: "40px",
                    height: "40px",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => insertChar(k)}
                >
                  {k}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
      {!property.singleLine && editMD && (
        <div style={{ width: "100%", position: "relative", paddingBottom: "1px" }}>
          <MDEditor
            textareaProps={{ spellCheck: "true", lang: lit.language === "en" ? "en_US" : lit.language }}
            value={lit.value}
            preview="edit"
            onChange={(e) => {
              if (e) onChange(lit.copyWithUpdatedValue(e))
            }}
            commands={[
              commands.bold,
              commands.italic,
              commands.strikethrough,
              commands.hr,
              commands.title,
              commands.divider,
              commands.link,
              commands.quote,
              commands.code,
              commands.image,
              commands.divider,
              commands.unorderedListCommand,
              commands.orderedListCommand,
              commands.checkedListCommand,
              commands.divider,
              codeEdit,
              codePreview,
            ]}
            extraCommands={[]}
          />
          <span
            className={"opaHover on"}
            style={{ position: "absolute", right: "5px", top: "7px", fontSize: "0px", cursor: "pointer" }}
            onClick={() => setEditMD(!editMD)}
          >
            <MDIcon style={{ height: "15px" }} titleAccess={"Use rich text editor"} />
          </span>
        </div>
      )}
      <LangSelect
        onChange={(value) => {
          onChange(lit.copyWithUpdatedLanguage(value))
        }}
        value={lit.language || ""}
        property={property}
        {...(error ? { error: true } : {})}
        editable={editable}
        config={config}
      />
      {preview && ( // TODO see if fromWylie & MD can both be used ('escape' some chars?)
        <div className="preview-ewts">
          <TextField disabled value={preview} variant="standard" />
          {/*editMD && <MDEditor.Markdown source={fromWylie(lit.value)} /> // not really working  */}
        </div>
      )}
    </div>
  )
}

export const LangSelect: FC<{
  onChange: (value: string) => void
  value: string
  property?: PropertyShape
  disabled?: boolean
  error?: boolean
  editable?: boolean
  config: RDEConfig
}> = ({ onChange, value, property, disabled, error, editable, config }) => {
  const onChangeHandler = (event: React.ChangeEvent<{ value: unknown }>) => {
    onChange(event.target.value as string)
  }

  const languages = property?.defaultLanguage
    ? langsWithDefault(property.defaultLanguage, config.possibleLiteralLangs)
    : config.possibleLiteralLangs

  return (
    <div style={{ position: "relative" }}>
      <TextField
        variant="standard"
        select
        InputLabelProps={{ shrink: true }}
        className={"ml-2"}
        value={value}
        style={{ minWidth: 100, flexShrink: 0, marginTop: "5px" }}
        onChange={onChangeHandler}
        {...(disabled ? { disabled: true } : {})}
        {...(error ? { error: true, helperText: <br /> } : {})}
        {...(!editable ? { disabled: true } : {})}
      >
        {languages.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
        {!languages.some((l) => l.value === value) && (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        )}
      </TextField>
    </div>
  )
}

const EditString: FC<{
  property: PropertyShape
  lit: LiteralWithId
  onChange: (value: LiteralWithId) => void
  label: React.ReactNode
  editable?: boolean
  updateEntityState: (status: EditedEntityState, id: string, removingFacet?: boolean, forceRemove?: boolean) => void
  entity: Subject
  index: number
  config: RDEConfig
}> = ({ property, lit, onChange, label, editable, updateEntityState, entity, index, config }) => {
  const [uiLang] = useRecoilState(uiLangState)

  const dt = property.datatype
  const pattern = property.pattern ? new RegExp(property.pattern) : undefined

  const [error, setError] = useState<React.ReactNode | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const getPatternError = (val: string) => {
    let err = ""
    if (pattern !== undefined && val !== "" && !val.match(pattern)) {
      err = ValueByLangToStrPrefLang(property.errorMessage, uiLang)
      debug("err:", property.errorMessage)
    }
    return err
  }

  let timerPreview = 0
  let changeCallback = (val: string): void => {
    return
  }
  useEffect(() => {
    changeCallback = (val: string) => {
      if (val === "") {
        setError(null)
        setPreview(null)
        updateEntityState(EditedEntityState.Saved, lit.id)
      } else {
        if (timerPreview) window.clearTimeout(timerPreview)
        const delay = 350
        timerPreview = window.setTimeout(() => {
          const obj = config.previewLiteral(new rdf.Literal(val, lit.language, lit.datatype), uiLang)
          const { value } = obj
          let { error } = obj
          setPreview(value)
          if (!error) error = getPatternError(val)
          setError(error)
          updateEntityState(error ? EditedEntityState.Error : EditedEntityState.Saved, lit.id)
        }, delay)
      }
      onChange(lit.copyWithUpdatedValue(val))
    }
  })

  const getEmptyStringError = (val: string): React.ReactNode | null => {
    if (!val && property.minCount) return
    ;<>
      <ErrorIcon style={{ fontSize: "20px", verticalAlign: "-7px" }} />{" "}
      <i>
        <>{i18n.t("error.empty")}</>
      </i>
    </>
    return null
  }

  useEffect(() => {
    const newError = error || getEmptyStringError(lit.value)
    //debug("newE:",newError,error,lit,lit.id)
    if (newError != error) {
      setError(newError)
      updateEntityState(newError ? EditedEntityState.Error : EditedEntityState.Saved, lit.id)
    }
  })

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <TextField
        variant="standard"
        //className={/*classes.root +*/ " mt-2"}
        label={label}
        style={{ width: "100%" }}
        value={lit.value}
        // TODO: refactor
        {...(property.qname !== "bds:NoteShape-contentLocationStatement" ? { InputLabelProps: { shrink: true } } : {})}
        onBlur={(e) => setPreview(null)}
        onFocus={(e) => changeCallback(e.target.value)}
        onChange={(e) => changeCallback(e.target.value)}
        {...(!editable ? { disabled: true } : {})}
        {...(error ? { error: true, helperText: error } : {})}
      />
      {preview && (
        <div className="preview-EDTF" style={{ width: "100%" }}>
          <pre>{preview}</pre>
        </div>
      )}
    </div>
  )
}

const EditBool: FC<{
  property: PropertyShape
  lit: LiteralWithId
  onChange: (value: LiteralWithId) => void
  label: React.ReactNode
  editable?: boolean
}> = ({ property, lit, onChange, label, editable }) => {

  const dt = property.datatype

  let val: boolean | string = !lit.value || lit.value == "false" || lit.value == "0" ? false : true
  if (property.defaultValue === null && lit.value == "") val = "unset"

  //debug("bool:",property.qname,property.defaultValue,lit)

  const changeCallback = (val: string) => {
    onChange(lit.copyWithUpdatedValue(val == "false" ? "0" : "1"))
  }
  return (
    <TextField
      variant="standard"
      select
      style={{ padding: "1px", minWidth: "250px" }}
      label={label}
      value={val}
      InputLabelProps={{ shrink: true }}
      onChange={(e) => {
        if (e.target.value != "-") changeCallback(e.target.value)
      }}
      {...(!editable ? { disabled: true } : {})}
    >
      {["true", "false"].concat(val === "unset" ? [val] : []).map((v) => (
        <MenuItem key={v} value={v}>
          {i18n.t("types." + v)}
        </MenuItem>
      ))}
    </TextField>
  )
}

const EditInt: FC<{
  property: PropertyShape
  lit: LiteralWithId
  onChange: (value: LiteralWithId) => void
  label: React.ReactNode
  editable?: boolean
  updateEntityState: (status: EditedEntityState, id: string, removingFacet?: boolean, forceRemove?: boolean) => void
  hasNoOtherValue: boolean
  index: number
  globalError?: string
}> = ({ property, lit, onChange, label, editable, updateEntityState, hasNoOtherValue, index, globalError }) => {
  // used for integers and gYear

  const dt = property.datatype
  const minInclusive = property.minInclusive
  const maxInclusive = property.maxInclusive
  const minExclusive = property.minExclusive
  const maxExclusive = property.maxExclusive

  const getIntError = (val: string) => {
    let err = ""
    if (globalError) {
      err = globalError
    } else if (hasNoOtherValue && val === "") {
      err = i18n.t("error.empty")
    } else if (val !== undefined && val !== "") {
      const valueInt = parseInt(val)
      if (minInclusive && minInclusive > valueInt) {
        err = i18n.t("error.superiorTo", { val: minInclusive })
      } else if (maxInclusive && maxInclusive < valueInt) {
        err = i18n.t("error.inferiorTo", { val: maxInclusive })
      } else if (minExclusive && minExclusive >= valueInt) {
        err = i18n.t("error.superiorToStrict", { val: minExclusive })
      } else if (maxExclusive && maxExclusive <= valueInt) {
        err = i18n.t("error.inferiorToStrict", { val: maxExclusive })
      }
    }
    return err
  }

  const [error, setError] = useState("") //getIntError(lit.value))

  useEffect(() => {
    if (!hasNoOtherValue && (lit.value === undefined || lit.value === null || lit.value === "")) return
    const newError = getIntError(lit.value)
    if (newError != error) {
      setError(newError)
      updateEntityState(newError ? EditedEntityState.Error : EditedEntityState.Saved, lit.id)
    }
  })

  const changeCallback = (val: string) => {
    const newError = getIntError(val)
    if (newError != error) setError(newError)
    else updateEntityState(newError ? EditedEntityState.Error : EditedEntityState.Saved, lit.id)

    //debug("change:", newError)

    if (dt && dt.value == xsdgYear) {
      //pad to four digits in the case of xsdgYear
      /* eslint-disable no-magic-numbers */
      if (val.startsWith("-")) {
        val = "-" + val.substring(1).padStart(4, "0")
      } else {
        val = val.padStart(4, "0")
      }
    }
    onChange(lit.copyWithUpdatedValue(val))
  }

  let value = lit.value
  if (dt && dt.value == xsdgYear) {
    // don't display the leading 0
    //debug("val?", value, lit)
    value = value.replace(/^(-?)0+/, "$1")
  }

  return (
    <TextField
      variant="standard"
      label={label}
      style={{ width: 240 }}
      value={value}
      {...(error
        ? {
            helperText: (
              <React.Fragment>
                <ErrorIcon style={{ fontSize: "20px", verticalAlign: "-7px" }} />
                <i> {error}</i>
              </React.Fragment>
            ),
            error: true,
          }
        : {})}
      type="number"
      InputProps={{ inputProps: { min: minInclusive, max: maxInclusive } }}
      InputLabelProps={{ shrink: true }}
      onChange={(e) => changeCallback(e.target.value)}
      {...(!editable ? { disabled: true } : {})}
    />
  )
}

const xsdgYear = ns.XSD("gYear").value
const rdflangString = ns.RDF("langString").value
const xsdinteger = ns.XSD("integer").value
const xsddecimal = ns.XSD("decimal").value
const xsdint = ns.XSD("int").value
const xsdboolean = ns.XSD("boolean").value

const intishTypeList = [xsdinteger, xsddecimal, xsdint]

/**
 * Display component, with DeleteButton
 */
const LiteralComponent: FC<{
  lit: LiteralWithId
  subject: Subject
  property: PropertyShape
  canDel: boolean
  isUniqueLang: boolean
  isUniqueValueAmongSiblings: boolean
  create?: JSX.Element
  editable: boolean
  topEntity?: Subject
  updateEntityState: (status: EditedEntityState, id: string, removingFacet?: boolean, forceRemove?: boolean) => void
  config: RDEConfig
}> = ({
  lit,
  subject,
  property,
  canDel,
  isUniqueValueAmongSiblings,
  isUniqueLang,
  create,
  editable,
  topEntity,
  updateEntityState,
  config,
}) => {
  if (property.path == null) throw "can't find path of " + property.qname
  const [list, setList] = useRecoilState(subject.getAtomForProperty(property.path.sparqlString))
  const index = list.findIndex((listItem) => listItem === lit)
  const [entities, setEntities] = useRecoilState(entitiesAtom)
  const [undos, setUndos] = useRecoilState(uiUndosState)
  const [uiLang] = useRecoilState(uiLangState)

  const propLabel = ValueByLangToStrPrefLang(property.prefLabels, uiLang)
  const helpMessage = ValueByLangToStrPrefLang(property.helpMessage, uiLang)

  //debug("lit:", property.qname, isUniqueValueAmongSiblings, lit.val)

  const onChange: (value: LiteralWithId) => void = (value: LiteralWithId) => {
    const newList = replaceItemAtIndex(list, index, value)
    setList(newList)
  }

  const deleteItem = () => {
    const newList = removeItemAtIndex(list, index)
    setList(newList)
    updateEntityState(EditedEntityState.Saved, lit.id)
  }

  useEffect(() => {
    let error = false
    const entityQname = topEntity ? topEntity.qname : subject.qname
    const n = entities.findIndex((e) => e.subjectQname === entityQname)
    if (n > -1) {
      const ent = entities[n]
      if (ent.state === EditedEntityState.Error) error = true
    }
    if (!error && (!errors[entityQname] || !Object.keys(errors[entityQname]).length)) {
      updateEntityState(EditedEntityState.Saved, lit.id)
    }
  }, [undos])

  const t = property.datatype
  let edit, classN

  if (t?.value === rdflangString) {
    classN = "langString " + (lit.value ? "lang-" + lit.language : "")
    edit = (
      <EditLangString
        property={property}
        lit={lit}
        onChange={onChange}
        label={[
          propLabel,
          helpMessage ? (
            <Tooltip key={lit.id} title={helpMessage}>
              <HelpIcon className="help literal" />
            </Tooltip>
          ) : null,
        ]}
        {...(property.uniqueLang && !isUniqueLang ? { globalError: i18n.t("error.unique") } : {})}
        editable={editable && !property.readOnly}
        updateEntityState={updateEntityState}
        entity={topEntity ? topEntity : subject}
        index={index}
        config={config}
      />
    )
    // eslint-disable-next-line no-extra-parens
  } else if (t?.value === xsdgYear || (t && t?.value && intishTypeList.includes(t.value))) {
    classN = "gYear intish"
    edit = (
      <EditInt
        property={property}
        lit={lit}
        onChange={onChange}
        label={[
          propLabel,
          helpMessage ? (
            <Tooltip key={lit.id} title={helpMessage}>
              <HelpIcon className="help literal" />
            </Tooltip>
          ) : null,
        ]}
        editable={editable && !property.readOnly}
        updateEntityState={updateEntityState}
        hasNoOtherValue={property.minCount === 1 && list.length === 1}
        index={index}
        {...(property.uniqueValueAmongSiblings && !isUniqueValueAmongSiblings
          ? { globalError: i18n.t("error.uniqueV") }
          : {})}
      />
    )
  } else if (t?.value === xsdboolean) {
    edit = (
      <EditBool
        property={property}
        lit={lit}
        onChange={onChange}
        label={[
          propLabel,
          helpMessage ? (
            <Tooltip key={lit.id} title={helpMessage}>
              <HelpIcon className="help literal" />
            </Tooltip>
          ) : null,
        ]}
        editable={editable && !property.readOnly}
      />
    )
  } else {
    edit = (
      <EditString
        property={property}
        lit={lit}
        onChange={onChange}
        label={[
          propLabel,
          helpMessage ? (
            <Tooltip key={lit.id} title={helpMessage}>
              <HelpIcon className="help literal" />
            </Tooltip>
          ) : null,
        ]}
        editable={editable && !property.readOnly}
        updateEntityState={updateEntityState}
        entity={subject}
        index={index}
        config={config}
      />
    )
  }

  return (
    <>
      <div className={classN} style={{ display: "flex", alignItems: "flex-end" /*, width: "100%"*/ }}>
        {edit}
        <div className="hoverPart">
          <button
            className="btn btn-link ml-2 px-0 py-0 close-facet-btn"
            onClick={deleteItem}
            {...(!canDel ? { disabled: true } : {})}
          >
            <RemoveCircleOutlineIcon className="my-0 close-facet-btn" />
          </button>
          {create}
        </div>
      </div>
    </>
  )
}

//TODO: should probably go to another file
const FacetComponent: FC<{
  subNode: Subject
  subject: Subject
  property: PropertyShape
  canDel: boolean
  //force?: boolean
  editable: boolean
  topEntity: Subject
  updateEntityState: (status: EditedEntityState, id: string, removingFacet?: boolean, forceRemove?: boolean) => void
  shape: NodeShape
  config: RDEConfig
}> = ({ subNode, subject, property, canDel, /*force,*/ editable, topEntity, updateEntityState, shape, config }) => {
  if (property.path == null) throw "can't find path of " + property.qname
  const [list, setList] = useRecoilState(subject.getAtomForProperty(property.path.sparqlString))
  const [uiLang] = useRecoilState(uiLangState)
  const index = list.findIndex((listItem) => listItem === subNode)
  const [entities, setEntities] = useRecoilState(entitiesAtom)

  const deleteItem = () => {
    updateEntityState(EditedEntityState.Saved, subNode.qname, true)
    const newList = removeItemAtIndex(list, index)
    setList(newList)
  }

  const targetShape = property.targetShape
  if (!targetShape) throw "unable to find target shape of " + property.lname

  const withDisplayPriority: PropertyShape[] = [],
    withoutDisplayPriority: PropertyShape[] = []
  targetShape.properties.map((subprop) => {
    if (subprop.displayPriority && subprop.displayPriority >= 1) {
      withDisplayPriority.push(subprop)
    } else {
      withoutDisplayPriority.push(subprop)
    }
  })

  const [force, setForce] = useState(false)
  const hasExtra = withDisplayPriority.length > 0 // && isSimplePriority
  let waitForNoHisto = false
  const toggleExtra = () => {
    if (waitForNoHisto) return

    waitForNoHisto = true
    subject.noHisto(false, -1) // put empty subnodes in history before tmp:allValuesLoaded

    setForce(!force)

    const delay = 350
    setTimeout(() => {
      subject.noHisto(false, false) // history back to normal
      subject.resetNoHisto()
      waitForNoHisto = false
    }, delay) // *arbitrary long* delay during which button can't be used
  }

  const [edit, setEdit] = useRecoilState(uiEditState)

  //debug("facet:", edit, topEntity.qname, subject.qname + " " + property.qname + " " + subNode.qname)

  let editClass = ""
  if (
    edit === subject.qname + " " + property.qname + " " + subNode.qname ||
    edit.startsWith(subNode.qname + " ") ||
    edit.endsWith(" " + subject.qname)
  ) {
    editClass = "edit"
  }

  return (
    <>
      <div
        className={"facet " + editClass + " editable-" + editable + " force-" + force}
        onClick={(ev) => {
          setEdit(subject.qname + " " + property.qname + " " + subNode.qname)
          const target = ev.target as Element
          if (editClass || target?.classList && !target?.classList?.contains("close-facet-btn")) {
            ev.stopPropagation()
          }
        }}
      >
        <div className={"card pt-2 pb-3 pr-3 mt-4 pl-2 " + (hasExtra ? "hasDisplayPriority" : "")}>
          {targetShape.independentIdentifiers && <div className="internalId">{subNode.lname}</div>}
          {withoutDisplayPriority.map((p, index) => (
            <PropertyContainer
              key={index + p.uri}
              property={p}
              subject={subNode}
              embedded={true}
              force={force}
              editable={!p.readOnly}
              owner={subject}
              topEntity={topEntity}
              shape={shape}
              siblingsPath={property.path?.sparqlString}
              config={config}
            />
          ))}
          {withDisplayPriority.map((p, index) => (
            <PropertyContainer
              key={index + p.uri}
              property={p}
              subject={subNode}
              embedded={true}
              force={force}
              editable={!p.readOnly}
              owner={subject}
              topEntity={topEntity}
              shape={shape}
              siblingsPath={property.path?.sparqlString}
              config={config}
            />
          ))}
          {hasExtra && (
            <span className="toggle-btn btn btn-rouge mt-4" onClick={toggleExtra}>
              <>{i18n.t("general.toggle", { show: force ? i18n.t("general.hide") : i18n.t("general.show") })}</>
            </span>
          )}
          <div className="close-btn">
            {targetShape.description && (
              <Tooltip title={ValueByLangToStrPrefLang(targetShape.description, uiLang)}>
                <HelpIcon className="help" />
              </Tooltip>
            )}
            <button
              className="btn btn-link ml-2 px-0 close-facet-btn py-0"
              onClick={deleteItem}
              {...(!canDel ? { disabled: true } : {})}
            >
              <CloseIcon className="close-facet-btn my-1" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

//TODO: component to display an external entity that has already been selected, with a delete button to remove it
// There should probably be a ExtEntityCreate or something like that to allow an entity to be selected
const ExtEntityComponent: FC<{
  extRes: ExtRDFResourceWithLabel
  subject: Subject
  property: PropertyShape
  canDel: boolean
  onChange: (value: ExtRDFResourceWithLabel, idx: number, removeFirst: boolean | undefined) => void
  idx: number
  exists: (uri: string) => boolean
  editable: boolean
  owner?: Subject
  title: string
  updateEntityState: (status: EditedEntityState, id: string, removingFacet?: boolean, forceRemove?: boolean) => void
  shape: NodeShape
  config: RDEConfig
}> = ({
  extRes,
  subject,
  property,
  canDel,
  onChange,
  idx,
  exists,
  editable,
  owner,
  title,
  updateEntityState,
  shape,
  config,
}) => {
  if (property.path == null) throw "can't find path of " + property.qname
  const [list, setList] = useRecoilState(subject.getAtomForProperty(property.path.sparqlString))
  const index = list.findIndex((listItem) => listItem === extRes)
  const [entities, setEntities] = useRecoilState(entitiesAtom)

  const deleteItem = () => {
    let newList = removeItemAtIndex(list, index)
    // remove first empty field if alone & displayPriority >= 1
    if (idx === 1 && newList.length === 1) {
      const first = newList[0]
      if (first instanceof ExtRDFResourceWithLabel && first.uri === "tmp:uri") newList = []
    }
    setList(newList)
  }

  const [error, setError] = useState("")

  useEffect(() => {
    let newError
    const nonEmptyList = list.filter((e) => e instanceof RDFResource && e.uri !== "tmp:uri")
    if (property.minCount && nonEmptyList.length < property.minCount) {
      newError = i18n.t("error.minC", { count: property.minCount })
    } else if (property.maxCount && nonEmptyList.length > property.maxCount) {
      newError = i18n.t("error.maxC", { count: property.maxCount })
    } else newError = ""

    //debug("nE?e",property.qname,newError,error)
    //debug("minC?",newError,nonEmptyList.length,property.minCount,property.maxCount)

    setError(newError)
    updateEntityState(newError ? EditedEntityState.Error : EditedEntityState.Saved, property.qname)
  }, [list])

  //, ...extRes.uri === "tmp:uri" ? { /*width: "100%"*/ } : {} }}>
  return (
    <div className={"extEntity" + (extRes.uri === "tmp:uri" ? " new" : "")} style={{ position: "relative" }}>
      <div
        style={{
          ...extRes.uri !== "tmp:uri"
            ? {
                display: "inline-flex",
                width: "auto",
                backgroundColor: "#f0f0f0",
                borderRadius: "4px",
                border: "1px solid #ccc",
                flexDirection: "row",
                position: "static",
              }
            : {
                display: "flex",
              },
        }}
        {...(extRes.uri !== "tmp:uri" ? { className: "px-2 py-1 mr-2 mt-2 card" } : {})}
      >
        <config.resourceSelector
          value={extRes}
          onChange={onChange}
          property={property}
          idx={idx}
          exists={exists}
          subject={subject}
          editable={editable}
          {...(owner ? { owner } : {})}
          title={title}
          globalError={error}
          updateEntityState={updateEntityState}
          shape={shape}
          config={config}
        />
        {extRes.uri !== "tmp:uri" && (
          <button className={"btn btn-link ml-2 px-0"} onClick={deleteItem} {...(!canDel ? { disabled: true } : {})}>
            {extRes.uri === "tmp:uri" ? <RemoveCircleOutlineIcon /> : <CloseIcon />}
          </button>
        )}
      </div>
    </div>
  )
}

//TODO: component to display an external entity that has already been selected, with a delete button to remove it
// There should probably be a ExtEntityCreate or something like that to allow an entity to be selected
const SelectComponent: FC<{
  res: LiteralWithId | RDFResourceWithLabel
  subject: Subject
  property: PropertyShape
  canDel: boolean
  canSelectNone: boolean
  selectIdx: number
  editable: boolean
  create?: JSX.Element
  updateEntityState: (status: EditedEntityState, id: string, removingFacet?: boolean, forceRemove?: boolean) => void
}> = ({ res, subject, property, canDel, canSelectNone, selectIdx, editable, create, updateEntityState }) => {
  if (property.path == null) throw "can't find path of " + property.qname
  const [list, setList] = useRecoilState(subject.getAtomForProperty(property.path.sparqlString))
  const [uiLang, setUiLang] = useRecoilState(uiLangState)
  const [uiLitLang, setUiLitLang] = useRecoilState(uiLitLangState)

  const [entities, setEntities] = useRecoilState(entitiesAtom)
  const [uiTab] = useRecoilState(uiTabState)
  const entity = entities.findIndex((e, i) => i === uiTab)

  const propLabel = ValueByLangToStrPrefLang(property.prefLabels, uiLang)
  const helpMessage = ValueByLangToStrPrefLang(property.helpMessage, uiLitLang)

  let possibleValues = property.in
  if (possibleValues == null) throw "can't find possible list for " + property.uri

  if (canSelectNone) possibleValues = [noneSelected, ...possibleValues]

  const index = selectIdx

  const deleteItem = () => {
    const newList = removeItemAtIndex(list, index)
    setList(newList)
  }

  const getElementFromValue = (value: string, checkActualValue = false) => {
    if (possibleValues === null) return null
    for (const v of possibleValues) {
      if (v.id === value || checkActualValue && v.value === value) {
        return v
      }
    }
    debug("error cannot get element from value " + value)
    return null
  }

  const val = res instanceof RDFResourceWithLabel ? res : getElementFromValue(list[index].value, true)

  //debug("selec:", property.qname, index, list, collec, listOrCollec, val, val?.id, res, res?.id, property)

  const onChange: (event: ChangeEvent<{ name?: string | undefined; value: unknown }>) => void = (event) => {
    const resForNewValue = getElementFromValue(event.target.value as string)
    if (resForNewValue == null) {
      throw "getting value from SelectComponent that's not in the list of possible values " + event.target.value
    }
    let newList
    if (resForNewValue == noneSelected && canDel) {
      newList = removeItemAtIndex(list, index)
    } else {
      newList = replaceItemAtIndex(list, index, resForNewValue)
    }
    setList(newList)
  }

  // does this work? to me using a "setXyz" in a condition must fail (should work encapsulated in a useEffect though)
  if (possibleValues.length == 1 && list.length == 0) {
    setList([possibleValues[0]])
  }

  const [error, setError] = useState("")
  const valueNotInList = !possibleValues.some((pv) => pv.id === val?.id)
  useEffect(() => {
    if (valueNotInList) {
      //debug("not in list:",property.path.sparqlString+"_"+selectIdx,res,val,possibleValues)
      setError(""+i18n.t("error.select", { val: val?.value }))
      updateEntityState(EditedEntityState.Error, property.path?.sparqlString + "_" + selectIdx)
    } else {
      updateEntityState(EditedEntityState.Saved, property.path?.sparqlString + "_" + selectIdx)
    }
  }, [valueNotInList])

  useEffect(() => {
    return () => {
      const inOtherEntity = !window.location.href.includes("/" + entities[entity]?.subjectQname + "/")
      if (!inOtherEntity)
        updateEntityState(EditedEntityState.Saved, property.path?.sparqlString + "_" + selectIdx, false, !inOtherEntity)
    }
  }, [])

  if (possibleValues.length > 1 || error) {
    return (
      <>
        <div className="resSelect" style={{ display: "inline-flex", alignItems: "flex-end" }}>
          <TextField
            variant="standard"
            select
            className={"selector mr-2"}
            value={val?.id}
            key={"textfield_" + selectIdx + "_" + index}
            style={{ padding: "1px", minWidth: "250px" }}
            onChange={onChange}
            label={[
              propLabel, // ? propLabel : "[unlabelled]",
              helpMessage ? (
                <Tooltip key={"tooltip_" + selectIdx + "_" + index} title={helpMessage}>
                  <HelpIcon className="help" />
                </Tooltip>
              ) : null,
            ]}
            {...(error
              ? {
                  helperText: (
                    <React.Fragment>
                      <ErrorIcon style={{ fontSize: "20px", verticalAlign: "-7px" }} />
                      <i> {error}</i>
                    </React.Fragment>
                  ),
                  error: true,
                }
              : {})}
            {...(!editable ? { disabled: true } : {})}
          >
            {possibleValues.map((v, k) => {
              //debug("possible:",v,v.uri)
              if (v instanceof RDFResourceWithLabel) {
                const r = v as RDFResourceWithLabel
                const label = ValueByLangToStrPrefLang(r.prefLabels, uiLitLang)
                const span = <span>{label ? label : r.lname}</span>
                return (
                  <MenuItem key={"menu-uri_" + selectIdx + r.id} value={r.id} className="withDescription">
                    {r.description ? (
                      <Tooltip title={ValueByLangToStrPrefLang(r.description, uiLitLang)}>{span}</Tooltip>
                    ) : 
                      span
                    }
                  </MenuItem>
                )
              } else {
                const l = v as LiteralWithId
                return (
                  <MenuItem
                    key={"menu-lit_" + selectIdx + l.id + "_" + index + "_" + k}
                    value={l.id}
                    className="withDescription"
                  >
                    {l.value}
                  </MenuItem>
                )
              }
            })}
            {valueNotInList && (
              <MenuItem
                key={"extra-val-id"}
                value={val?.id}
                className="withDescription"
                style={{ color: "red" }}
                disabled
              >
                {val?.value}
              </MenuItem>
            )}
          </TextField>
          <div className="hoverPart">
            {canDel && (
              <button className="btn btn-link mx-0 px-0 py-0" onClick={deleteItem}>
                <RemoveCircleOutlineIcon />
              </button>
            )}
            {create}
          </div>
        </div>
      </>
    )
  }
  return <></>
}

export default ValueList
