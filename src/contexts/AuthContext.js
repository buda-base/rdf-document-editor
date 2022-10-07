import React, { useEffect, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { useRecoilState } from "recoil"
import axios from "axios"

import config from "../config"
import { reloadProfileState, uiLangState, uiLitLangState, userIdState, RIDprefixState, demoAtom } from "../atoms/common"
import * as ns from "../helpers/rdf/ns"
import { demoUserId } from "../containers/DemoContainer"

const debug = require("debug")("rde:auth")

export const AuthContext = React.createContext()

export function AuthContextWrapper({ children }) {
  const { isAuthenticated, getIdTokenClaims, getAccessTokenSilently, user, logout, loading } = useAuth0()
  const [idToken, setIdToken] = useState("")
  const [profile, setProfile] = useState(null)
  const [loadingState, setLoadingState] = useState({ status: "idle", error: null })
  const [uiLang, setUiLang] = useRecoilState(uiLangState)
  const [uiLitLang, setUiLitLang] = useRecoilState(uiLitLangState)
  const [userId, setUserId] = useRecoilState(userIdState)
  const [reloadProfile, setReloadProfile] = useRecoilState(reloadProfileState)
  const [RIDprefix, setRIDprefix] = useRecoilState(RIDprefixState)
  const [demo, setDemo] = useRecoilState(demoAtom)

  useEffect(() => {
    async function checkSession() {
      const idToken = await getIdTokenClaims()
      setIdToken(idToken.__raw)
      localStorage.setItem("BLMPidToken", idToken.__raw)
      const cookie = await axios.get("https://iiif.bdrc.io/setcookie", {
        headers: {
          Authorization: `Bearer ${idToken.__raw}`,
        },
      })
      //debug("cookie", cookie)
    }

    const tryAuth = async () => {
      if (isAuthenticated) checkSession()
      else
        try {
          await getAccessTokenSilently()
        } catch (e) {
          //debug("login error")
        }
    }

    tryAuth()
  }, [getAccessTokenSilently, isAuthenticated])

  useEffect(() => {
    //debug("reload?",isAuthenticated,reloadProfile,loadingState.status)
    if (!reloadProfile) return

    if (isAuthenticated && idToken || demo) fetchProfile()

    debug("uP:", user, demo)

    let groups
    if (
      user &&
      user["https://auth.bdrc.io/groups"] &&
      (groups = user["https://auth.bdrc.io/groups"]) &&
      !groups.includes("admin")
    ) {
      logout({ returnTo: window.location.origin + "?notAdmin=true" })
    }
  }, [idToken, isAuthenticated, user, reloadProfile, demo])

  async function fetchProfile() {
    if (loadingState.status === "idle" || reloadProfile && loadingState.status === "fetched") {
      setLoadingState({ status: "fetching", error: null })
      let baseURL = config.API_BASEURL
      let url = "me/focusgraph"
      if (demo) {
        baseURL = "/examples/"
        url = "DemoUser.json"
      }
      await axios
        .request({
          method: "get",
          timeout: 4000,
          baseURL,
          url,
          headers: {
            ...!demo ? { Authorization: `Bearer ${idToken}` } : {},
            Accept: "application/json", //"text/turtle",
          },
        })
        .then(function (response) {
          let id = Object.keys(response.data),
            uiL,
            uiLitL,
            prefix
          const idx = id.findIndex((k) => k.includes("/user/U"))
          if (id.length) {
            //debug("Profile loaded", response.data, id, idx, id[idx])
            uiL = response.data[id[idx]][ns.BDOU("preferredUiLang").value]
            //if (uiL?.length) uiL = uiL[0].value
            if (uiL?.length) setUiLang(uiL.map((u) => u.value))

            uiLitL = response.data[id[idx]][ns.BDOU("preferredUiLiteralLangs").value]
            //if (uiLitL?.length) uiLitL = uiLitL[0].value
            if (uiLitL?.length) {
              let head = uiLitL[0].value
              const list = [],
                first = ns.RDF("first").value,
                rest = ns.RDF("first").value,
                nil = ns.RDF("nil").value
              do {
                if (head && response.data[head]) {
                  if (response.data[head][first]?.length) {
                    list.push(response.data[head][first][0].value)
                  }
                  if (response.data[head][rest]?.length && response.data[head][rest][0].value !== nil) {
                    head = response.data[head][rest][0].value
                  }
                } else head = null
              } while (head)
              //debug("list:",list)
              if (list.length) setUiLitLang(list)
            }

            prefix = response.data[id[idx]][ns.BDOU("localNameDefaultPrefix").value]
            //debug("RIDp:",prefix,response.data[id[idx]],ns.BDOU("localNameDefaultPrefix").value)
            if (prefix?.length && prefix[0].value) setRIDprefix(prefix[0].value)
            else setRIDprefix("")

            id = ns.qnameFromUri(id[idx])
            if (id) setUserId(id)
          }
          debug("Profile loaded", response.data, id, uiL)
          setReloadProfile(false)
          setLoadingState({ status: "fetched", error: null })
        })
        .catch(function (error) {
          debug("%O / retrying", error)
          if (!demo) fetchProfile()
        })
      /*
        .then(function (response) {
          debug("Profile loaded", response.data)
          setProfile(response.data)
        })
        .catch(function (error) {
          // debug("%O", error)

          if (error.response && error.response.data.output.payload.error === "Not Found") {
            // this may be normal as no profile is created until 1st order
            setLoadingState({ status: "error", error: "Customer not found" })
          } else {
            setLoadingState({ status: "error", error: "Unable to process" })
          }
        */
    }
  }

  const defaultContext = {
    profile,
    idToken,
    setProfile,
    fetchProfile,
  }

  return <AuthContext.Provider value={defaultContext}>{children}</AuthContext.Provider>
}
