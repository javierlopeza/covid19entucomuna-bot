const join = require('lodash/join');

function formatDefault(elements) {
  const formattedElements = [];
  // Title
  if (elements.title) {
    formattedElements.push(elements.title);
  }
  // Message
  if (elements.message) {
    formattedElements.push(elements.message);
  }
  // Data
  if (elements.data) {
    formattedElements.push(elements.data);
  }
  // Source
  if (elements.source) {
    formattedElements.push(elements.source);
  }
  return join(formattedElements, '\n');
}

module.exports = formatDefault;
