
// STARTER CODE FOR A CLOUD FUNCTION THAT IS THE FULFILLMENT FOR AN ACTION ON GOOGLE

'use strict';

const {dialogflow} = require('actions-on-google');

const functions = require('firebase-functions');

const swapi = require('swapi-node');

const app = dialogflow({debug:true});

// const swapi = require('swapi-node');

// SAMPLE INTENT HANDLER
 app.intent("test", (conv) => {

  // LOGIC FOR THIS INTENT GOES HERE:

    let Luke = Luke.getPerson(1);
    conv.ask(Luke.name);
    swapi.getPerson(1).then((result) => {
    return result;
});

  // TO RETURN TO DIALOGFLOW AND CONTINUE THE CONVERSATION, USE conv.ask()
    // conv.ask(`Let's chat some more.`);

  // TO RETURN TO DIALOGFLOW AND END THE CONVERSATION, USE conv.close()
    // conv.close(`Goodbye.`);
 });

exports.generateStarWarsUniverse = functions.https.onRequest(app);