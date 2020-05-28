const moment = require('./date');

function forHumans(dateStr) {
  return moment(dateStr).format('D [de] MMMM');
}

module.exports = { forHumans };
