function buildUrl(region, commune) {
  let url = 'https://covid19entucomuna.cl';
  if (region) {
    url += `/regiones/${region}`;
    if (commune) {
      url += `/comunas/${commune}`;
    }
  }
  return url;
}

function buildFilename(region, commune) {
  let filename = 'Chile';
  if (region) {
    filename += `-${region}`;
    if (commune) {
      filename += `-${commune}`;
    }
  }
  return filename;
}

module.exports = {
    buildUrl,
    buildFilename,
};