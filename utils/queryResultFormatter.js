const get = require('lodash/get');
const join = require('lodash/join');
const dateFormatter = require('../utils/dateFormatter');
const valueFormatter = require('../utils/valueFormatter');

const communesRegionsKeys = require('../names/communes_regions_keys.json');
const completeRegions = require('../names/complete_regions.json');
const similarCommunesAndRegions = require('../names/similar_communes_and_regions.json');

function fallbackStrategy(queryResult) {
  return queryResult.fulfillmentText;
}

function formatPlaceMetrics(place) {
  const {
    confirmados: { value: confirmados },
    activos: { value: activos },
    recuperados: { value: recuperados },
    fallecidos: { value: fallecidos },
  } = place;
  const confirmadosText = `↳ ${valueFormatter.forHumans(confirmados)} casos confirmados`;
  const activosText = `↳ ${valueFormatter.forHumans(activos)} casos activos`;
  const recuperadosText = `↳ ${valueFormatter.forHumans(recuperados)} casos recuperados`;
  const fallecidosText = `↳ ${valueFormatter.forHumans(fallecidos)} fallecidos`;

  return join([confirmadosText, activosText, recuperadosText, fallecidosText], '\n');
}

function formatChileInfo(queryResult, chileData) {
  const date = dateFormatter.forHumans(chileData.activos.date);
  const title = `*Reporte Diario / ${date}*`;
  const message = 'En Chile hay:';
  const metricsText = formatPlaceMetrics(chileData);
  const source = '\nFuente: MINSAL';
  return join([title, message, metricsText, source], '\n');
}

function formatRegionInfo(queryResult, chileData) {
  const regionName = queryResult.parameters.region.stringValue;
  if (!regionName.length) {
    return fallbackStrategy(queryResult);
  }
  const completeRegionName = completeRegions[regionName];
  const regionActiveCases = chileData.regiones[regionName].activos;
  const formattedRegionActiveCases = valueFormatter.forHumans(
    regionActiveCases.value
  );
  const date = dateFormatter.forHumans(regionActiveCases.date);
  const title = `*Informe EPI / ${date}*`;
  const message = `En la ${completeRegionName} hay ${formattedRegionActiveCases} casos activos.`;
  const source = '\nFuente: MINSAL';
  return join([title, message, source], '\n');
}

function formatCommuneInfo(queryResult, chileData) {
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
  const date = dateFormatter.forHumans(communeActiveCases.date);
  const title = `*Informe EPI / ${date}*`;
  const communeHelperText = similarCommunesAndRegions.includes(communeName) ? ' la comuna de ' : ' ';
  const message = `En${communeHelperText}${communeName} (${comepleteRegionName}) hay ${formattedCommuneActiveCases} casos activos.`;
  const source = '\nFuente: MINSAL';
  return join([title, message, source], '\n');
}

function formatQueryResult(queryResult, chileData) {
  const parsingStrategies = {
    INFO_CHILE: formatChileInfo,
    INFO_REGION: formatRegionInfo,
    INFO_COMMUNE: formatCommuneInfo,
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
