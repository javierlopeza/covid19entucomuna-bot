const { Telegraf } = require('telegraf');
const detectTextIntent = require('../dialogflow/detectTextIntent');
const formatQueryResult = require('../utils/queryResultFormatter');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
bot.on('text', async (ctx) => {
  const incommingMessage = ctx.message.text;
  const queryResult = await detectTextIntent('123456', incommingMessage);
  console.log(incommingMessage);
  console.log(queryResult);
  // const formattedQueryResult = formatQueryResult(queryResult, 'telegram');
  const formattedQueryResult = formatQueryResult(queryResult);
  const replyMessage = formattedQueryResult;
  return ctx.replyWithPhoto({
    url:
    'https://raw.githubusercontent.com/javierlopeza/coronavirus-chile-bot/master/webshooter/extracted/Chile-Antofagasta-San%20Pedro%20de%20Atacama.png',
  }, {
    caption: replyMessage,
  });
});
bot.launch();
