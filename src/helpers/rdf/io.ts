import * as rdf from "rdflib"

interface StoreWithEtag {
  store: rdf.Store
  etag: string | null
}

export const loadTtl = async (
  url: string,
  allow404 = false,
  idToken = "",
  allowEmptyEtag = true
): Promise<StoreWithEtag> => {
  return new Promise(async (resolve, reject) => {
    const headers = new Headers()
    headers.set("Accept", "text/turtle")
    if (idToken) {
      headers.set("Authorization", "Bearer " + idToken)
    }
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
