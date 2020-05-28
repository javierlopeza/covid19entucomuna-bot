const communesRegionsKeys = require('../data/communes_regions_keys.json');
const communesRegions = require('../data/communes_regions.json');

function getCommuneActiveCases(place, chileData) {
  const region = communesRegionsKeys[place.name];
  return chileData.regiones[region].comunas[place.keyName].activos;
}

function getRegionActiveCases(place, chileData) {
  return chileData.regiones[place.keyName].activos;
}

function formatActiveCasesMessage(place, chileData) {
  let activeCases;
  switch (place.placeType) {
    case 'region':
      activeCases = getRegionActiveCases(place, chileData);
      return `En la ${place.name}, al ${activeCases.date}, hay ${activeCases.value} casos activos.`;

    case 'commune':
      activeCases = getCommuneActiveCases(place, chileData);
      const region = communesRegions[place.name];
      return `En la comuna de ${place.name} (${region}), al ${activeCases.date}, hay *${activeCases.value}* casos activos.`;

    default:
      return '¿Qué comuna quieres revisar?';
  }
}

module.exports = formatActiveCasesMessage;
