const communesRegions = require('../data/communes_regions.json');

function getActiveCases(place, chileData) {
  switch (place.placeType) {
    case 'region':
      return chileData[place.keyName];

    case 'commune':
      const region = communesRegions[place.name];
      return chileData.regiones[region].comunas[place.keyName].activos;

    default:
      return null;
  }
}

module.exports = getActiveCases;
