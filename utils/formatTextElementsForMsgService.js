const get = require('lodash/get');

const formatForTelegram = require('./msg_services_formatters/telegram');
const formatForWhatsApp = require('./msg_services_formatters/whatsapp');
const formatDefault = require('./msg_services_formatters/default');

const formatters = {
  telegram: formatForTelegram,
  whatsapp: formatForWhatsApp,
};

function formatTextElementsForMsgService(elements, msgService) {
  return get(formatters, msgService, formatDefault)(elements);
}

module.exports = formatTextElementsForMsgService;
