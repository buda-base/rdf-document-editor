import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  CircularProgress,
  Button,
  FormHelperText, FormControl, TextField
} from "@mui/material"
import i18n from "i18next"
import { useRecoilState, useRecoilValue, selectorFamily } from "recoil"
import * as rdf from "rdflib"
import {
  reloadEntityState,
  uiLangState,
  uiLitLangState,
  uiTabState,
  entitiesAtom,
  savePopupState,
  EditedEntityState
} from "../atoms/common"
import * as ns from "../helpers/rdf/ns"
import { HttpError } from "../helpers/rdf/io"
import { history, errors, defaultGraphNode } from "../helpers/rdf/types"
import { debug as debugfactory } from "debug"
import RDEConfig from "../helpers/rde_config"
import { RDEProps } from "../helpers/editor_props"
import { Error as ErrorIcon  } from '@mui/icons-material'
import { useTranslation } from "react-i18next"
import { HistoryHandler } from "../helpers/observer"

const debug = debugfactory("rde:BottomBarContainer")

export default function BottomBarContainer (props: RDEProps) {
  const [entities, setEntities] = useRecoilState(entitiesAtom)
  const [uiTab] = useRecoilState(uiTabState)
  const entity = entities.findIndex((e, i) => i === uiTab)
  const entitySubj = entities[entity]?.subject
  const entityUri = entities[entity]?.subject?.uri || "tmp:uri"
  const [message, setMessage] = useState<string|null>(null)
  const [uiLang, setUiLang] = useRecoilState(uiLangState)
  const [lang, setLang] = useState<string>(uiLang)
  const [saving, setSaving] = useState(false)
  const [gen, setGen] = useState(false)
  const [popupOn, setPopupOn] = useRecoilState(savePopupState)
  const [reloadEntity, setReloadEntity] = useRecoilState(reloadEntityState)
  const shapeQname = entities[entity]?.shapeQname
  const [error, setError] = useState<React.ReactNode>(null)
  const [errorCode, setErrorCode] = useState<number|undefined>(undefined)
  const [spinner, setSpinner] = useState(false)  

  const { t } = useTranslation()

  const delay = 300
  const closePopup = (delay1 = delay, delay2 = delay) => {
    setTimeout(() => {
      setPopupOn(false)
      setTimeout(() => {
        setSaving(false)
        setMessage(null)
        setGen(false)
        setError(null)
        setErrorCode(undefined)
        setSpinner(false)
      }, delay2)
    }, delay1)
  }

  const closePopupHandler = (event: React.MouseEvent) => {
    closePopup()
  }

  const save = async (event: React.MouseEvent): Promise<undefined> => {

    if (entities[entity].state === EditedEntityState.Error && !saving) {
      if (!window.confirm(t("error.force") as string)) return
    }

    if (!saving) {
      setPopupOn(true)
      setSaving(true)
      return
    }

    const store = new rdf.Store()
    props.config.prefixMap.setDefaultPrefixes(store)
    entitySubj?.graph.addNewValuestoStore(store)

    // save ttl to localStorage
    rdf.serialize(defaultGraphNode, store, undefined, "text/turtle", async function (err, str) {
      if (err) {
        debug(err, store)
        throw "error when serializing"
      }
      props.config.setUserLocalEntity(
        entities[entity].subjectQname,
        shapeQname,
        str,
        false,
        entities[entity].etag,
        entities[entity].state === EditedEntityState.NeedsSaving
      )
    })

    let etag:string|null = null
    if (entitySubj) {
      try {
        setSpinner(true)
        etag = await props.config.putDocument(
          entitySubj.node,
          store,
          entities[entity]?.etag,
          '"' + message + '"@' + lang
        )
        setSpinner(false)

        // TODO: save etag without doing everything twice? see above
        const defaultRef = new rdf.NamedNode(rdf.Store.defaultGraphURI)
        rdf.serialize(defaultRef, store, undefined, "text/turtle", async function (err, str) {
          props.config.setUserLocalEntity(entities[entity].subjectQname, shapeQname, str, false, etag, false)
        })
      } catch (error: any) {
        // TODO: better error handling
        debug("error:", error)
        if (error.status === 412) {
          setErrorCode(error.status)
          setError(
            <React.Fragment>
              {t("error.newer")}
              <br />
              {t("error.lost")}
            </React.Fragment>
          )
        } else {
          setError(error.status ? error.status : error.message ? error.message : error)
        }
        setSpinner(false)

        return
      }
    }

    const newEntities = [...entities]
    newEntities[entity] = {
      ...newEntities[entity],
      state: EditedEntityState.Saved,
      etag: etag,
      loadedUnsavedFromLocalStorage: false,
    }
    setEntities(newEntities)

    history[entityUri] = history[entityUri].filter((h) => !h["tmp:allValuesLoaded"])
    history[entityUri].push({ "tmp:allValuesLoaded": true })
    newEntities[entity].subject?.resetNoHisto()

    closePopup()
  }

  const onLangChangeHandler = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLang(event.target.value as string)
  }

  const onMessageChangeHandler = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMessage(event.target.value as string)
  }

  const saved =
    entities[entity] &&
    [EditedEntityState.Saved, EditedEntityState.NotLoaded, EditedEntityState.Loading].includes(entities[entity].state)

  //debug("saved:", saved)

  const handleReload = () => {
    if (history && history[entityUri]) delete history[entityUri]
    const newEntities = [...entities]
    newEntities[entity] = { ...newEntities[entity], subject: null }
    setEntities(newEntities)
    if (entitySubj)
      setReloadEntity(entitySubj.qname)

    closePopup()
  }

  return (
    <nav className="bottom navbar navbar-dark navbar-expand-md"><>
      { props.extraElement }
      <HistoryHandler entityUri={entityUri} />
      <span />
      <span/>
      <div className={"popup " + (popupOn ? "on " : "") + (error ? "error " : "") }>
        <div>
          {saving && (
            <>
              <TextField
                label={"commit message"}
                value={message}
                variant="standard"
                onChange={onMessageChangeHandler}
                InputLabelProps={{ shrink: true }}
                style={{ minWidth: 300 }}
                {...(error
                  ? {
                      helperText: (
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <ErrorIcon style={{ fontSize: "20px" }} />
                          <i style={{ paddingLeft: "5px", lineHeight: "14px", display: "inline-block" }}>{error}</i>
                          &nbsp;&nbsp;
                          {errorCode === 412 && (
                            <Button className="btn-blanc" onClick={handleReload}>
                              {t("general.reload")}
                            </Button>
                          )}
                        </span>
                      ),
                      error: true,
                    }
                  : {})}
              />

              <TextField
                select
                variant="standard"
                value={lang}
                onChange={onLangChangeHandler}
                InputLabelProps={{ shrink: true }}
                style={{ minWidth: 100, marginTop: "16px", marginLeft: "15px", marginRight: "15px" }}
              >
                {props.config.possibleLiteralLangs.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </>
          )}
        </div>
      </div>
      <div className="buttons">
        <Button
          variant="outlined"
          onClick={save}
          className="btn-rouge"
          {...(spinner || (message === "" && saving) || saved || errorCode
            ? { disabled: true }
            : {})}
        >
          {spinner ? (
            <CircularProgress size="14px" color="primary" />
          ) : (saving ? (
            t("general.ok")
          ) : ( t("general.save") ))}
        </Button>
        {saving && (
          <Button
            variant="outlined"
            onClick={closePopupHandler}
            className="btn-blanc ml-2"
          >
            {t("general.cancel")}
          </Button>
        )}
      </div>
    </></nav>
  )
}
