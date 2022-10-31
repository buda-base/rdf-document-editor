import React, { useState, FC, useRef, useMemo, useEffect } from "react"
import { PropertyContainer } from "./ValueList"
import { Subject, errors, LiteralWithId } from "../helpers/rdf/types"
import RDEConfig from "../helpers/rde_config"
import { PropertyGroup, PropertyShape, NodeShape } from "../helpers/rdf/shapes"
import { uiLangState, uiEditState, uiGroupState, initListAtom } from "../atoms/common"
import * as lang from "../helpers/lang"
import { Error as ErrorIcon } from "@mui/icons-material"
import { useRecoilState } from "recoil"
import i18n from "i18next"
import { MapContainer, LayersControl, TileLayer, Marker, useMapEvents } from "react-leaflet"
import ReactLeafletGoogleLayer from "react-leaflet-google-layer"
import { GeoSearchControl, OpenStreetMapProvider, GoogleProvider } from "leaflet-geosearch"

import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-geosearch/dist/geosearch.css"
import { debug as debugfactory } from "debug"

const debug = debugfactory("rde:entity:propertygroup")

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41], // eslint-disable-line no-magic-numbers
  iconAnchor: [12, 41], // eslint-disable-line no-magic-numbers
  popupAnchor: [1, -34], // eslint-disable-line no-magic-numbers
  shadowSize: [41, 41], // eslint-disable-line no-magic-numbers
})

function DraggableMarker({
  pos,
  icon,
  setCoords,
}: {
  pos: L.LatLng
  icon: L.Icon
  setCoords: (val: L.LatLng) => void
}) {
  const [position, setPosition] = useState<L.LatLng>(pos)
  const markerRef = useRef<any>(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
          setCoords(marker.getLatLng())
        }
      },
    }),
    []
  )

  //debug("mark:",markerRef,pos)
  useEffect(() => {
    if (markerRef.current && (markerRef.current.lat != pos.lat || markerRef.current.lng != pos.lng)) {
      markerRef.current.setLatLng(pos)
    }
  })

  return (
    <Marker draggable={true} eventHandlers={eventHandlers} position={position} icon={icon} ref={markerRef}></Marker>
  )
}

const MapEventHandler = ({
  coords,
  redraw,
  setCoords,
  config,
}: {
  coords: L.LatLng
  redraw: boolean
  setCoords: (val: L.LatLng) => void
  config: RDEConfig
}) => {
  const map = useMapEvents({
    click: (ev) => {
      debug("click:", ev)
      setCoords(ev.latlng)
    },
  })

  useEffect(() => {
    map.setView(coords, map.getZoom())
  })

  useEffect(() => {
    const provider = config.googleMapsAPIKey
      ? new GoogleProvider({ apiKey: config.googleMapsAPIKey })
      : new OpenStreetMapProvider()

    const searchControl = GeoSearchControl({
      provider,
      showPopUp: false,
      showMarker: false,
    })
    map.addControl(searchControl)
    map.on("geosearch/showlocation", (params) => {
      //debug("found",params)

      // fix for first click not triggering marker event
      const elem: HTMLElement | null = document.querySelector(".leaflet-container")
      if (elem) elem.click()
    })

    //return () =>
    map.removeControl(searchControl)
  }, [])

  return null
}

const PropertyGroupContainer: FC<{
  group: PropertyGroup
  subject: Subject
  onGroupOpen: (e: React.MouseEvent, currentGroupName: string) => void
  shape: NodeShape
  GISatoms?: { lat: string; long: string }
  config: RDEConfig
}> = ({ group, subject, onGroupOpen, shape, GISatoms, config }) => {
  const [uiLang] = useRecoilState(uiLangState)
  const label = lang.ValueByLangToStrPrefLang(group.prefLabels, uiLang)
  const [force, setForce] = useState(false)

  //debug("propertyGroup:", subject.qname, errors, group, subject)

  const withDisplayPriority: PropertyShape[] = [],
    withoutDisplayPriority: PropertyShape[] = []
  const errorKeys = Object.keys(errors[subject.qname] ? errors[subject.qname] : {})
  let hasError = false
  group.properties.map((property) => {
    //debug("target:",property.qname,property.targetShape?.properties)
    if (
      !hasError && errorKeys.some((k) => k.includes(property.qname)) ||
      property.targetShape?.properties.some((p) => errorKeys.some((k) => k.includes(p.qname)))
    ) {
      //debug("group with error:",group.qname,property.qname)
      hasError = true
    }
    if (property.displayPriority && property.displayPriority >= 1) {
      withDisplayPriority.push(property)
    } else {
      withoutDisplayPriority.push(property)
    }
  })
  const hasExtra = withDisplayPriority.length > 0 // && isSimplePriority
  const toggleExtra = () => {
    setForce(!force)
  }

  //debug("prio:",group.qname,group,withDisplayPriority,withoutDisplayPriority);

  const [edit, setEdit] = useRecoilState(uiEditState)
  const [groupEd, setGroupEd] = useRecoilState(uiGroupState)

  const [lat, setLat] = useRecoilState(config.latProp ? subject.getAtomForProperty(config.latProp.uri) : initListAtom)
  const [lng, setLng] = useRecoilState(config.lngProp ? subject.getAtomForProperty(config.lngProp.uri) : initListAtom)
  const [redraw, setRedraw] = useState(false)
  let coords: L.LatLng,
    zoom = 5,
    unset = false
  //debug("coords:", coords, lat, lon)
  if (lat.length && lng.length && lat[0].value != "" && lat[0].value != "")
    coords = new L.LatLng(Number(lat[0].value), Number(lng[0].value))
  else {
    unset = true
    coords = new L.LatLng(30, 0) //eslint-disable-line no-magic-numbers
    zoom = 2 //eslint-disable-line no-magic-numbers
  }

  useEffect(() => {
    //debug("update:",lon,lat)
    setRedraw(true)
  }, [lng, lat])

  const setCoords = (val: L.LatLng) => {
    //debug("val:",val)
    setRedraw(false)
    if (!isNaN(val.lat)) {
      if (lat.length > 0 && lat[0] instanceof LiteralWithId) setLat([lat[0].copyWithUpdatedValue("" + val.lat)])
      if (lat.length == 0) setLat([new LiteralWithId("" + val.lat)])
    }
    if (!isNaN(val.lng)) {
      if (lng.length > 0 && lng[0] instanceof LiteralWithId) setLng([lng[0].copyWithUpdatedValue("" + val.lng)])
      if (lng.length == 0) setLng([new LiteralWithId("" + val.lat)])
    }
  }

  return (
    <div
      role="main"
      className={"group " + (hasError ? "hasError" : "")}
      id={group.qname}
      style={{ scrollMargin: "90px" }}
    >
      <section className="album">
        <div className="container col-lg-6 col-md-6 col-sm-12" style={{ border: "dashed 1px none" }}>
          <div
            className={
              "row card my-2 pb-3" + (edit === group.qname ? " group-edit" : "") + " show-displayPriority-" + force
            }
            onClick={(e: React.MouseEvent) => {
              if (onGroupOpen && groupEd !== group.qname) onGroupOpen(e, groupEd)
              setEdit(group.qname)
              setGroupEd(group.qname)
            }}
          >
            <p className="">
              {label}
              {hasError && <ErrorIcon />}
            </p>
            {
              //groupEd === group.qname && ( // WIP, good idea but breaks undo initialization
              <>
                <div className={group.properties.length <= 1 ? "hidePropLabel" : ""} style={{ fontSize: 0 }}>
                  {withoutDisplayPriority.map((property, index) => (
                    <PropertyContainer
                      key={index}
                      property={property}
                      subject={subject}
                      editable={property.readOnly !== true}
                      shape={shape}
                      config={config}
                    />
                  ))}
                  {withDisplayPriority.map((property, index) => (
                    <PropertyContainer
                      key={index}
                      property={property}
                      subject={subject}
                      force={force}
                      editable={property.readOnly !== true}
                      shape={shape}
                      config={config}
                    />
                  ))}
                  {config.gisPropertyGroup &&
                    group.uri === config.gisPropertyGroup.uri &&
                    groupEd === group.qname && // to force updating map when switching between two place entities
                    coords && ( // TODO: add a property in shape to enable this instead
                      <div style={{ position: "relative", overflow: "hidden", marginTop: "16px" }}>
                        <MapContainer style={{ width: "100%", height: "400px" }} zoom={zoom} center={coords}>
                          <LayersControl position="topright">
                            {config.googleMapsAPIKey && (
                              <>
                                <LayersControl.BaseLayer checked name="Satellite+Roadmap">
                                  <ReactLeafletGoogleLayer apiKey={config.googleMapsAPIKey} type="hybrid" />
                                </LayersControl.BaseLayer>
                                <LayersControl.BaseLayer name="Satellite">
                                  <ReactLeafletGoogleLayer apiKey={config.googleMapsAPIKey} type="satellite" />
                                </LayersControl.BaseLayer>
                                <LayersControl.BaseLayer name="Roadmap">
                                  <ReactLeafletGoogleLayer apiKey={config.googleMapsAPIKey} type="roadmap" />
                                </LayersControl.BaseLayer>
                                <LayersControl.BaseLayer name="Terrain">
                                  <ReactLeafletGoogleLayer apiKey={config.googleMapsAPIKey} type="terrain" />
                                </LayersControl.BaseLayer>
                              </>
                            )}
                            {!config.googleMapsAPIKey && (
                              <LayersControl.BaseLayer checked name="OpenStreetMap">
                                <TileLayer url="https://{s}.tile.iosb.fraunhofer.de/tiles/osmde/{z}/{x}/{y}.png" />
                              </LayersControl.BaseLayer>
                            )}
                          </LayersControl>
                          {!unset && <DraggableMarker pos={coords} icon={redIcon} setCoords={setCoords} />}
                          <MapEventHandler coords={coords} redraw={redraw} setCoords={setCoords} config={config} />
                        </MapContainer>
                      </div>
                    )}
                  {hasExtra && (
                    <span className="toggle-btn  btn btn-rouge my-4" onClick={toggleExtra}>
                      <>{i18n.t("general.toggle", { show: force ? i18n.t("general.hide") : i18n.t("general.show") })}</>
                    </span>
                  )}
                </div>
              </>
            }
          </div>
        </div>
      </section>
    </div>
  )
}

export default PropertyGroupContainer
