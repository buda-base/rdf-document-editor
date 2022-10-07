import React, { useState, FC, ReactElement, useRef, useMemo, useCallback, useEffect } from "react"
import PropertyContainer from "./PropertyContainer"
import { RDFResource, Subject, errors } from "../../../helpers/rdf/types"
import { PropertyGroup, PropertyShape } from "../../../helpers/rdf/shapes"
import { uiLangState, uiEditState, uiNavState, uiGroupState } from "../../../atoms/common"
import * as lang from "../../../helpers/lang"
import * as ns from "../../../helpers/rdf/ns"
import { ErrorIcon } from "../../../routes/layout/icons"
import { atom, useRecoilState, useRecoilValue } from "recoil"
import { OtherButton } from "./ValueList"
import i18n from "i18next"
//import { Waypoint } from "react-waypoint"
import { MapContainer, LayersControl, TileLayer, Popup, Marker, useMapEvents } from "react-leaflet"
import ReactLeafletGoogleLayer from "react-leaflet-google-layer"
import { GeoSearchControl, OpenStreetMapProvider, GoogleProvider } from "leaflet-geosearch"

import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-geosearch/dist/geosearch.css"

import config from "../../../config"

const debug = require("debug")("rde:entity:propertygroup")

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41], // eslint-disable-line no-magic-numbers
  iconAnchor: [12, 41], // eslint-disable-line no-magic-numbers
  popupAnchor: [1, -34], // eslint-disable-line no-magic-numbers
  shadowSize: [41, 41], // eslint-disable-line no-magic-numbers
})

function DraggableMarker({ pos, icon, setCoords }) {
  const [position, setPosition] = useState(pos)
  const markerRef = useRef(null)
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
    if (markerRef.current && (markerRef.current.lat != pos[0] || markerRef.current.lng != pos[1])) {
      markerRef.current.setLatLng({ lat: pos[0], lng: pos[1] })
    }
  })

  return (
    <Marker draggable={true} eventHandlers={eventHandlers} position={position} icon={icon} ref={markerRef}></Marker>
  )
}

const MapEventHandler = ({ coords, redraw, setCoords }) => {
  const map = useMapEvents({
    click: (ev) => {
      debug("click:", ev)
      setCoords(ev.latlng)
    },
  })

  useEffect(() => {
    if (coords.length === Number("2")) map.setView(coords, map.getZoom())
  })

  useEffect(() => {
    const provider = new OpenStreetMapProvider()
    // TODO? allow use of search in Google API configuration
    //if (config.googleAPIkey) provider = new GoogleProvider({ params: { key: config.googleAPIkey } })

    const searchControl = new GeoSearchControl({
      provider,
      showPopUp: false,
      showMarker: false,
    })
    map.addControl(searchControl)
    map.on("geosearch/showlocation", (params) => {
      //debug("found",params)

      // fix for first click not triggering marker event
      const elem = document.querySelector(".leaflet-container")
      if (elem) elem.click()
    })

    return () => map.removeControl(searchControl)
  }, [])

  return null
}

const PropertyGroupContainer: FC<{ group: PropertyGroup; subject: Subject; onGroupOpen: () => void; shape: Shape }> = ({
  group,
  subject,
  onGroupOpen,
  shape,
}) => {
  const [uiLang] = useRecoilState(uiLangState)
  const label = lang.ValueByLangToStrPrefLang(group.prefLabels, uiLang)
  const [force, setForce] = useState(false)

  //debug("propertyGroup:", subject.qname, errors, group, subject)

  const withDisplayPriority: PropertyShape[] = [],
    withoutDisplayPriority: PropertyShape[] = []
  //let isSimplePriority = false
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
    if (
      property.displayPriority &&
      property.displayPriority >= 1
      /* // no need 
      ||
      property.targetShape &&
        property.targetShape.properties &&
        property.targetShape.properties.filter((subprop) => subprop.displayPriority && subprop.displayPriority >= 1)
          .length > 0 */
    ) {
      withDisplayPriority.push(property)
      //if(property.displayPriority && property.displayPriority >= 1) isSimplePriority = true
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

  // TODO: how not to hard code this here? add "useAsMapLatitude" property in shape?
  const [lat, setLat] = useRecoilState(subject.getAtomForProperty(ns.BDO("placeLat").value))
  const [lon, setLon] = useRecoilState(subject.getAtomForProperty(ns.BDO("placeLong").value))
  const [redraw, setRedraw] = useState(false)
  let coords,
    zoom = "5",
    unset
  //debug("coords:", coords, lat, lon)
  if (lat.length && lon.length && lat[0].value != "" && lat[0].value != "") coords = [lat[0].value, lon[0].value]
  else {
    unset = true
    coords = ["30", 0]
    zoom = "2"
  }

  useEffect(() => {
    //debug("update:",lon,lat)
    setRedraw(true)
  }, [lon, lat])

  const setCoords = (val) => {
    //debug("val:",val)
    setRedraw(false)
    if (!isNaN(val.lat)) setLat([lat[0].copyWithUpdatedValue("" + val.lat)])
    if (!isNaN(val.lng)) setLon([lon[0].copyWithUpdatedValue("" + val.lng)])
  }

  //const [nav, setNav] = useRecoilState(uiNavState)

  return (
    //<Waypoint scrollableAncestor={window} onEnter={() => setNav(group.qname)} topOffset={500} bottomOffset={500}>
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
            onClick={(e) => {
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
                    />
                  ))}
                  {group.qname === "bds:GISPropertyGroup" &&
                    groupEd === group.qname && // to force updating map when switching between two place entities
                    coords && ( // TODO: add a property in shape to enable this instead
                      <div style={{ position: "relative", overflow: "hidden", marginTop: "16px" }}>
                        <MapContainer style={{ width: "100%", height: "400px" }} zoom={zoom} center={coords}>
                          <LayersControl position="topright">
                            {config.googleAPIkey && (
                              <>
                                <LayersControl.BaseLayer checked name="Satellite+Roadmap">
                                  <ReactLeafletGoogleLayer apiKey={config.googleAPIkey} type="hybrid" />
                                </LayersControl.BaseLayer>
                                <LayersControl.BaseLayer name="Satellite">
                                  <ReactLeafletGoogleLayer apiKey={config.googleAPIkey} type="satellite" />
                                </LayersControl.BaseLayer>
                                <LayersControl.BaseLayer name="Roadmap">
                                  <ReactLeafletGoogleLayer apiKey={config.googleAPIkey} type="roadmap" />
                                </LayersControl.BaseLayer>
                                <LayersControl.BaseLayer name="Terrain">
                                  <ReactLeafletGoogleLayer apiKey={config.googleAPIkey} type="terrain" />
                                </LayersControl.BaseLayer>
                              </>
                            )}
                            {!config.googleAPIkey && (
                              <LayersControl.BaseLayer checked name="OpenStreetMap">
                                <TileLayer url="https://{s}.tile.iosb.fraunhofer.de/tiles/osmde/{z}/{x}/{y}.png" />
                              </LayersControl.BaseLayer>
                            )}
                          </LayersControl>
                          {!unset && <DraggableMarker pos={coords} icon={redIcon} setCoords={setCoords} />}
                          <MapEventHandler coords={coords} redraw={redraw} setCoords={setCoords} />
                        </MapContainer>
                      </div>
                    )}
                  {hasExtra && (
                    <span className="toggle-btn  btn btn-rouge my-4" onClick={toggleExtra}>
                      {i18n.t("general.toggle", { show: force ? i18n.t("general.hide") : i18n.t("general.show") })}
                    </span>
                  )}
                </div>
              </>
            }
          </div>
        </div>
      </section>
    </div>
    //</Waypoint>
  )
}

export default PropertyGroupContainer
