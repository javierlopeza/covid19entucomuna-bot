require('dotenv').config({ path: '../.env' });
const axios = require('axios');
const fs = require('fs');

// eslint-disable-next-line func-names
(async function () {
  const response = await axios.get(process.env.CHILE_DATA_JSON_URL);
  const { data } = response;
  const json = JSON.stringify(data);
  fs.writeFile('chile-minified.json', json, 'utf8', (err) => {
    if (err) {
      throw err;
    }
  });
}());
