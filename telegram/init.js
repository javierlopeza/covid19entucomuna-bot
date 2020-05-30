const { Telegraf } = require('telegraf');
const detectTextIntent = require('../dialogflow/detectTextIntent');
const formatQueryResult = require('../utils/queryResultFormatter');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
bot.on('text', async (ctx) => {
  const incommingMessage = ctx.message.text;
  const queryResult = await detectTextIntent('123456', incommingMessage);
  console.log(incommingMessage);
  console.log(queryResult);
  const formattedQueryResult = formatQueryResult(queryResult, 'telegram');
  const replyMessage = formattedQueryResult;
  return ctx.replyWithMarkdown(replyMessage);
});
bot.launch();
