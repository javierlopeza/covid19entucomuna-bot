const get = require('lodash/get');
const dateFormatter = require('../utils/dateFormatter');
const valueFormatter = require('../utils/valueFormatter');

const communesRegionsKeys = require('../data/communes_regions_keys.json');
const completeRegions = require('../data/complete_regions.json');

function fallbackStrategy(queryResult) {
  return queryResult.fulfillmentText;
}

function formatChileActiveCases(queryResult, chileData) {
  const activeCases = chileData.activos;
  const date = dateFormatter.forHumans(activeCases.date);
  const value = valueFormatter.forHumans(activeCases.value);
  return `En Chile, al ${date}, hay ${value} casos activos.`;
}

function formatRegionActiveCases(queryResult, chileData) {
  const regionName = queryResult.parameters.region.stringValue;
  if (!regionName.length) {
    return fallbackStrategy(queryResult);
  }
  const completeRegionName = completeRegions[regionName];
  const regionActiveCases = chileData.regiones[regionName].activos;
  const formattedRegionActiveCases = valueFormatter.forHumans(
    regionActiveCases.value
  );
  const regionDate = dateFormatter.forHumans(regionActiveCases.date);
  return `En la ${completeRegionName}, al ${regionDate}, hay ${formattedRegionActiveCases} casos activos.`;
}

function formatCommuneActiveCases(queryResult, chileData) {
  const communeName = queryResult.parameters.commune.stringValue;
  if (!communeName.length) {
    return fallbackStrategy(queryResult);
  }
  const regionKey = communesRegionsKeys[communeName];
  const communeActiveCases =
    chileData.regiones[regionKey].comunas[communeName].activos;
  const formattedCommuneActiveCases = valueFormatter.forHumans(
    communeActiveCases.value
  );
  const comepleteRegionName = completeRegions[communesRegionsKeys[communeName]];
  const communeDate = dateFormatter.forHumans(communeActiveCases.date);
  return `En la comuna de ${communeName} (${comepleteRegionName}), al ${communeDate}, hay ${formattedCommuneActiveCases} casos activos.`;
}

function formatQueryResult(queryResult, chileData) {
  const parsingStrategies = {
    ACTIVE_CASES_CHILE: formatChileActiveCases,
    ACTIVE_CASES_REGION: formatRegionActiveCases,
    ACTIVE_CASES_COMMUNE: formatCommuneActiveCases,
  };
  try {
    return get(
      parsingStrategies,
      queryResult.intent,
      fallbackStrategy
    )(queryResult, chileData);
  } catch (error) {
    console.log(error);
    return 'Ups, no he entendido a qué te refieres.';
  }
}

module.exports = formatQueryResult;
