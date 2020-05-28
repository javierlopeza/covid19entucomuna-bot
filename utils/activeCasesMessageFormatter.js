const communesRegionsKeys = require('../data/communes_regions_keys.json');
const communesRegions = require('../data/communes_regions.json');
const dateFormatter = require('../utils/dateFormatter');
const valueFormatter = require('../utils/valueFormatter');

function getCommuneActiveCases(place, chileData) {
  const region = communesRegionsKeys[place.name];
  return chileData.regiones[region].comunas[place.keyName].activos;
}

function getRegionActiveCases(place, chileData) {
  return chileData.regiones[place.keyName].activos;
}

function formatActiveCasesMessage(place, chileData) {
  switch (place.placeType) {
    case 'region':
      const regionActiveCases = getRegionActiveCases(place, chileData);
      const formattedRegionActiveCases = valueFormatter.forHumans(regionActiveCases.value);
      const regionDate = dateFormatter.forHumans(regionActiveCases.date);
      return `En la ${place.name}, al ${regionDate}, hay ${formattedRegionActiveCases} casos activos.`;

    case 'commune':
      const communeActiveCases = getCommuneActiveCases(place, chileData);
      const formattedCommuneActiveCases = valueFormatter.forHumans(communeActiveCases.value);
      const region = communesRegions[place.name];
      const communeDate = dateFormatter.forHumans(communeActiveCases.date);
      return `En la comuna de ${place.name} (${region}), al ${communeDate}, hay ${formattedCommuneActiveCases} casos activos.`;

    default:
      return '¿Qué comuna quieres revisar?';
  }
}

module.exports = formatActiveCasesMessage;
