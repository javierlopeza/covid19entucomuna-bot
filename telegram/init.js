const { Telegraf } = require('telegraf');
const Markup = require('telegraf/markup');
const detectTextIntent = require('../dialogflow/detectTextIntent');
const formatQueryResult = require('../utils/queryResultFormatter');
const getQueryResultImageUrl = require('../utils/getQueryResultImageUrl');
const buildQueryResultLink = require('../utils/buildQueryResultLink');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
bot.on('text', async (ctx) => {
  const incommingMessage = ctx.message.text;
  const queryResult = await detectTextIntent('123456', incommingMessage);
  console.log(incommingMessage);
  console.log(queryResult);
  // Send photo (if possible)
  const queryResultImageUrl = getQueryResultImageUrl(queryResult);
  if (queryResultImageUrl) {
    await ctx.replyWithPhoto({ url: queryResultImageUrl });
  }
  // Build formatted message
  const queryResultFormattedMessage = formatQueryResult(queryResult, 'telegram');
  // Build place link
  const queryResultLink = buildQueryResultLink(queryResult, 'Telegram');
  if (queryResultLink) {
    // Send message with place link
    const linkKeyboard = Markup.inlineKeyboard([
      Markup.urlButton(queryResultLink.label, queryResultLink.url),
    ]).extra();
    await ctx.replyWithMarkdown(queryResultFormattedMessage, linkKeyboard);
  } else {
    // Send message alone
    await ctx.replyWithMarkdown(queryResultFormattedMessage);
  }
});
bot.launch();
