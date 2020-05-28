require('dotenv').config();
require('./twilio/init');
const loadChileData = require('./clients/chileDataLoader');
const detectTextIntent = require('./dialogflow/detectTextIntent');
const formatQueryResult = require('./utils/queryResultFormatter');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const MessagingResponse = require('twilio').twiml.MessagingResponse;

app.use(bodyParser.urlencoded({ extended: false }));

let chileData;
(async function () {
  chileData = await loadChileData();
})();
setTimeout(async () => {
  chileData = await loadChileData();
}, 60000);

app.post('/incoming', async (req, res) => {
  const incommingMessage = req.body.Body;
  const queryResult = await detectTextIntent('123456', incommingMessage);
  console.log(incommingMessage);
  console.log(queryResult);
  const formattedQueryResult = formatQueryResult(queryResult, chileData);
  const twiml = new MessagingResponse();
  twiml.message(formattedQueryResult);
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
