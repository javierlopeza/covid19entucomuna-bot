const formatForTelegram = require('./msg_services_formatters/telegram');
const formatForWhatsApp = require('./msg_services_formatters/whatsapp');

const formatters = {
  telegram: formatForTelegram,
  whatsapp: formatForWhatsApp,
};

function formatTextElementsForMsgService(elements, msgService) {
  return formatters[msgService](elements);
}

module.exports = formatTextElementsForMsgService;
