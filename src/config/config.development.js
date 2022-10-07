const config = {
  __DEV__: true,
  //API_BASEURL: "https://editserv.bdrc.io/",
  API_BASEURL: "https://editserv.bdrc.io/",
  env: process.env.NODE_ENV || "development",
  SITE_URL: "http://localhost:3001",
  requireAuth: true,
  //LIBRARY_URL: "http://localhost:3000",
  LIBRARY_URL: "http://library.bdrc.io",
  //TEMPLATES_BASE: "http://localhost:8080/",
  TEMPLATES_BASE: "http://purl.bdrc.io/",
  DEMO_MODE: true,
}

export default config
