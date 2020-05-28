const numeral = require('numeral');
require('numeral/locales/es');
numeral.locale('es');

function forHumans(value) {
  return numeral(value).format('0,0');
}

module.exports = { forHumans };
