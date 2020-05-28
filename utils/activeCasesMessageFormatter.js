const communesRegionsKeys = require('../data/communes_regions_keys.json');
const communesRegions = require('../data/communes_regions.json');
const dateFormatter = require('../utils/dateFormatter');

function getCommuneActiveCases(place, chileData) {
  const region = communesRegionsKeys[place.name];
  return chileData.regiones[region].comunas[place.keyName].activos;
}

function getRegionActiveCases(place, chileData) {
  return chileData.regiones[place.keyName].activos;
}

function formatActiveCasesMessage(place, chileData) {
  let activeCases;
  let date;
  switch (place.placeType) {
    case 'region':
      activeCases = getRegionActiveCases(place, chileData);
      date = dateFormatter.forHumans(activeCases.date);
      return `En la ${place.name}, al ${date}, hay ${activeCases.value} casos activos.`;

    case 'commune':
      activeCases = getCommuneActiveCases(place, chileData);
      const region = communesRegions[place.name];
      date = dateFormatter.forHumans(activeCases.date);
      return `En la comuna de ${place.name} (${region}), al ${date}, hay *${activeCases.value}* casos activos.`;

    default:
      return '¿Qué comuna quieres revisar?';
  }
}

module.exports = formatActiveCasesMessage;
