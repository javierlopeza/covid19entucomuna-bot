require('dotenv').config();
require('./twilio/init');
const detectTextIntent = require('./dialogflow/detectTextIntent');
const formatQueryResult = require('./utils/queryResultFormatter');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { MessagingResponse } = require('twilio').twiml;

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/message', async (req, res) => {
  const incommingMessage = req.body.Body;
  const queryResult = await detectTextIntent('123456', incommingMessage);
  console.log(incommingMessage);
  console.log(queryResult);
  const formattedQueryResult = formatQueryResult(queryResult);
  const twiml = new MessagingResponse();
  const message = twiml.message();
  message.body(formattedQueryResult);
  message.media('https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80');
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
