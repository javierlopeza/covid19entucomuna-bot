const dialogflow = require('@google-cloud/dialogflow');

const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const projectId = credentials.project_id;

const sessionsClient = new dialogflow.SessionsClient({
  projectId,
  credentials,
});

async function detectTextIntent(sessionId, query) {
  const sessionPath = sessionsClient.projectAgentSessionPath(
    projectId,
    sessionId,
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: 'es',
      },
    },
  };

  let textIntent;
  try {
    const responses = await sessionsClient.detectIntent(request);
    const { queryResult } = responses[0];
    textIntent = {
      intent: queryResult.intent.displayName,
      fulfillmentText: queryResult.fulfillmentText,
      parameters: queryResult.parameters.fields,
    };
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
  return textIntent;
}

module.exports = detectTextIntent;
