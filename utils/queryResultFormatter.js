const get = require('lodash/get');
const join = require('lodash/join');
const dateFormatter = require('./dateFormatter');
const valueFormatter = require('./valueFormatter');
const formatTextElementsForMsgService = require('./formatTextElementsForMsgService');

const chileData = require('../data/chile-minified.json');

const communesRegionsKeys = require('../names/communes_regions_keys.json');
const completeRegions = require('../names/complete_regions.json');
const similarCommunesAndRegions = require('../names/similar_communes_and_regions.json');


function fallbackStrategy(queryResult) {
  return {
    message: queryResult.fulfillmentText,
  };
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

function formatChileInfo() {
  const date = dateFormatter.forHumans(chileData.activos.date);
  const title = `Reporte Diario / ${date}`;
  const message = 'En Chile hay:';
  const metricsText = formatPlaceMetrics(chileData);
  const source = 'Fuente: MINSAL';
  return {
    title,
    message,
    data: metricsText,
    source,
  };
}

function formatRegionInfo(queryResult) {
  const regionName = queryResult.parameters.region.stringValue;
  if (!regionName.length) {
    return fallbackStrategy(queryResult);
  }
  const completeRegionName = completeRegions[regionName];
  const regionActiveCases = chileData.regiones[regionName].activos;
  const formattedRegionActiveCases = valueFormatter.forHumans(
    regionActiveCases.value,
  );
  const date = dateFormatter.forHumans(regionActiveCases.date);
  const title = `Informe EPI / ${date}`;
  const message = `En la ${completeRegionName} hay ${formattedRegionActiveCases} casos activos.`;
  const source = 'Fuente: MINSAL';
  return {
    title,
    message,
    source,
  };
}

function formatCommuneInfo(queryResult) {
  const communeName = queryResult.parameters.commune.stringValue;
  if (!communeName.length) {
    return fallbackStrategy(queryResult);
  }
  const regionKey = communesRegionsKeys[communeName];
  const communeActiveCases = chileData.regiones[regionKey].comunas[communeName].activos;
  const formattedCommuneActiveCases = valueFormatter.forHumans(
    communeActiveCases.value,
  );
  const comepleteRegionName = completeRegions[communesRegionsKeys[communeName]];
  const date = dateFormatter.forHumans(communeActiveCases.date);
  const title = `Informe EPI / ${date}`;
  const communeHelperText = similarCommunesAndRegions.includes(communeName) ? ' la comuna de ' : ' ';
  const message = `En${communeHelperText}${communeName} (${comepleteRegionName}) hay ${formattedCommuneActiveCases} casos activos.`;
  const source = 'Fuente: MINSAL';
  return {
    title,
    message,
    source,
  };
}

function formatQueryResult(queryResult, msgService) {
  const parsingStrategies = {
    INFO_CHILE: formatChileInfo,
    INFO_REGION: formatRegionInfo,
    INFO_COMMUNE: formatCommuneInfo,
  };
  try {
    const strategy = get(
      parsingStrategies,
      queryResult.intent,
      fallbackStrategy,
    );
    const textElements = strategy(queryResult);
    console.log(textElements);
    const resultText = formatTextElementsForMsgService(textElements, msgService);
    return resultText;
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    return 'Ups, no he entendido a qué te refieres.';
  }
}

module.exports = formatQueryResult;
