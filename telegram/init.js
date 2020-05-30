const { Telegraf } = require('telegraf');
const detectTextIntent = require('../dialogflow/detectTextIntent');
const formatQueryResult = require('../utils/queryResultFormatter');
const getQueryResultImageUrl = require('../utils/getQueryResultImageUrl');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
bot.on('text', async (ctx) => {
  const incommingMessage = ctx.message.text;
  const queryResult = await detectTextIntent('123456', incommingMessage);
  console.log(incommingMessage);
  console.log(queryResult);
  const queryResultImageUrl = getQueryResultImageUrl(queryResult);
  if (queryResultImageUrl) {
    const formattedQueryResult = formatQueryResult(queryResult);
    const replyMessage = formattedQueryResult;
    return ctx.replyWithPhoto(
      {
        url: queryResultImageUrl,
      },
      {
        caption: replyMessage,
      },
    );
  }
  const formattedQueryResult = formatQueryResult(queryResult, 'telegram');
  return ctx.replyWithMarkdown(formattedQueryResult);
});
bot.launch();
