const axios = require('axios');

async function loadChileData() {
  const response = await axios.get(process.env.CHILE_DATA_JSON_URL);
  return response.data;
}

module.exports = loadChileData;
