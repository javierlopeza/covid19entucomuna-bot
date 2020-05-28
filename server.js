require('dotenv').config();
const loadChileData = require('./clients/chileDataLoader');
const parsePlace = require('./utils/placeParser');
const formatActiveCasesMessage = require('./utils/activeCasesMessageFormatter');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const accountSid = process.env.SID;
const authToken = process.env.SID;
require('twilio')(accountSid, authToken);
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
  const parsedPlace = parsePlace(incommingMessage);
  const formattedMessage = formatActiveCasesMessage(parsedPlace, chileData);
  const twiml = new MessagingResponse();
  twiml.message(formattedMessage);
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
