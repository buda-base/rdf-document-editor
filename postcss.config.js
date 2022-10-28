
module.exports = {
  plugins: {
    "postcss-url": {
      url: asset => {
        if (asset.url[0] === '/') {
          return `.${asset.url}`;
        }
        return asset.url;
      }
    }
  }
}