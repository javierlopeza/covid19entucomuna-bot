const camelcaseKeys = require('camelcase-keys');
const sortBy = require('lodash/sortBy');
const head = require('lodash/head');
const lowercase = require('lodash/lowercase');
const levenshtein = require('js-levenshtein');

const regions = camelcaseKeys(require('../data/regions.json'), { deep: true });
const communes = camelcaseKeys(require('../data/communes.json'), { deep: true });

function cleanPlaceName(placeName) {
  // Lowercase
  let cleanName = lowercase(placeName);

  return cleanName;
}

function isRequestingRegion(message) {
  const words = lowercase(message).split(' ');
  // Will be requesting region data if message contains more than 1 word
  if (words.length <= 1) {
    return false;
  }
  // and first word is not more than 2 edits far from 'region'
  if (levenshtein(words[0], 'region') > 2) {
    return false;
  }
  return true;
}

function scorePlaces(places, message) {
  const placesWithScores = places.map((place) => ({
    ...place,
    score: levenshtein(cleanPlaceName(message), cleanPlaceName(place.name)),
  }));
  const sortedPlacesByScore = sortBy(placesWithScores, ['score']);
  return sortedPlacesByScore;
}

function parsePlace(message) {
  let scores = [];
  if (isRequestingRegion(message)) {
    scores = scorePlaces(regions, message);
  } else {
    scores = scorePlaces(communes, message);
  }
  return head(scores);
}

module.exports = parsePlace;
