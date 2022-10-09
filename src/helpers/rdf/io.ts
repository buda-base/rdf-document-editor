import * as rdf from "rdflib"
import i18n from "i18next"

interface StoreWithEtag {
  store: rdf.Store
  etag: string | null
}

const defaultFetchTtlHeaders = new Headers()
defaultFetchTtlHeaders.set("Accept", "text/turtle")

export const fetchTtl = async (
  url: string,
  allow404 = false,
  headers = defaultFetchTtlHeaders,
  allowEmptyEtag = true
): Promise<StoreWithEtag> => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(url, { headers: headers })

    // eslint-disable-next-line no-magic-numbers
    if (allow404 && response.status == 404) {
      resolve({store: rdf.graph(), etag: null})
      return
    }
    // eslint-disable-next-line no-magic-numbers
    if (response.status != 200) {
      reject(new Error("cannot fetch " + url))
      return
    }

    const etag = response.headers.get("etag")
    if (!allowEmptyEtag && !etag) {
      reject(new Error("no etag returned from " + url))
      return
    }

    let body = await response.text()
    const store: rdf.Store = rdf.graph()
    try {
      rdf.parse(body, store, rdf.Store.defaultGraphURI, "text/turtle")
    } catch {
      reject(new Error("cannot parse result of " + url + " in ttl"))
      return
    }
    resolve({ store, etag })
  })
}

const defaultPutTtlHeaders = new Headers()
defaultPutTtlHeaders.set("Content-Type", "text/turtle")

export const putTtl = async (
  url: string,
  s: rdf.Store,
  method = "PUT",
  headers = defaultPutTtlHeaders,
  allowEmptyEtag = true
): Promise<string|null> => {
  return new Promise(async (resolve, reject) => {
    const defaultRef = new rdf.NamedNode(rdf.Store.defaultGraphURI)
    rdf.serialize(defaultRef, s, undefined, "text/turtle", async function (err, str) {
      if (err) {
        reject(err)
        return
      }
      const response = await fetch(url, { headers, method, body: str })
      const etag = response.headers.get("etag")

      // eslint-disable-next-line no-magic-numbers
      if (response.status == 403) {
        reject(new Error(i18n.t("error.unauthorized", { url })))
        return
      }

      // eslint-disable-next-line no-magic-numbers
      if (response.status == 412) {
        reject(new Error(i18n.t("error.modified")))
        return
      }

      // eslint-disable-next-line no-magic-numbers
      if (response.status > 400) {
        reject(new Error("error " + response.status + " when saving " + url))
        return
      }

      if (!etag && !allowEmptyEtag) {
        reject(new Error("no etag returned from " + url))
        return
      }

      resolve(etag)
    })
  })
}
