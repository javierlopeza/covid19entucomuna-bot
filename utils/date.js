const moment = require('moment');
require('moment-timezone');
require('moment/locale/es');

moment.tz.setDefault('America/Santiago');
moment.locale('es');

module.exports = moment;
