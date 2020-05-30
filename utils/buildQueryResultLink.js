const keys = require('lodash/keys');

const baseUrl = 'https://covid19entucomuna.cl';
const communesRegionsKeys = require('../names/communes_regions_keys.json');

function buildChileLink() {
  return {
    url: encodeURI(baseUrl),
    label: 'Ver más',
  };
}

function buildRegionLink(queryResult) {
  const region = queryResult.parameters.region.stringValue;
  if (!region) {
    return null;
  }
  const url = `${baseUrl}/regiones/${region}`;
  return {
    url: encodeURI(url),
    label: 'Ver más',
  };
}

function buildCommuneLink(queryResult) {
  const commune = queryResult.parameters.commune.stringValue;
  const region = communesRegionsKeys[commune];
  if (!region || !commune) {
    return null;
  }
  const url = `${baseUrl}/regiones/${region}/comunas/${commune}`;
  return {
    url: encodeURI(url),
    label: 'Ver más',
  };
}

function buildHelpLink() {
  const url = `${baseUrl}/preguntas-frecuentes`;
  return {
    url: encodeURI(url),
    label: 'Ver Preguntas Frecuentes',
  };
}

function buildQueryResultLink(queryResult) {
  const intentsWithLink = {
    INFO_CHILE: buildChileLink,
    INFO_REGION: buildRegionLink,
    INFO_COMMUNE: buildCommuneLink,
    HELP: buildHelpLink,
  };
  let link;
  if (keys(intentsWithLink).includes(queryResult.intent)) {
    try {
      link = intentsWithLink[queryResult.intent](queryResult);
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
    }
  }
  return link;
}

module.exports = buildQueryResultLink;
