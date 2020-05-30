const keys = require('lodash/keys');

const activeCasesChartsBaseUrl = process.env.ACTIVE_CASES_CHARTS_BASE_URL;
const communesRegionsKeys = require('../names/communes_regions_keys.json');

function buildChileUrl() {
  const url = `${activeCasesChartsBaseUrl}/Chile.png`;
  return encodeURI(url);
}

function buildRegionUrl(queryResult) {
  const region = queryResult.parameters.region.stringValue;
  if (!region) {
    return null;
  }
  const url = `${activeCasesChartsBaseUrl}/Chile-${region}.png`;
  return encodeURI(url);
}

function buildCommuneUrl(queryResult) {
  const commune = queryResult.parameters.commune.stringValue;
  const region = communesRegionsKeys[commune];
  if (!region || !commune) {
    return null;
  }
  const url = `${activeCasesChartsBaseUrl}/Chile-${region}-${commune}.png`;
  return encodeURI(url);
}

function getQueryResultImageUrl(queryResult) {
  const intentsWithImage = {
    INFO_CHILE: buildChileUrl,
    INFO_REGION: buildRegionUrl,
    INFO_COMMUNE: buildCommuneUrl,
  };
  let imageUrl;
  if (keys(intentsWithImage).includes(queryResult.intent)) {
    try {
      imageUrl = intentsWithImage[queryResult.intent](queryResult);
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
    }
  }
  return imageUrl;
}

module.exports = getQueryResultImageUrl;
