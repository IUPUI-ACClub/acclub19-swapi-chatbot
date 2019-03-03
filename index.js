
// STARTER CODE FOR A CLOUD FUNCTION THAT IS THE FULFILLMENT FOR AN ACTION ON GOOGLE

'use strict';

const functions = require('firebase-functions');

const swapi = require('swapi-node');

const app = dialogflow({debug:true});


// const swapi = require('swapi-node');

// SAMPLE INTENT HANDLER
 app.intent("test", (conv) => {
     
    //  let newVariable = "Luke Skywalker";
    //       conv.ask(newVariable);

  // LOGIC FOR THIS INTENT GOES HERE:

    // let Luke = "";
    // Luke = Luke.getPerson(1);
    
     swapi.getPerson(2).then((result) => {
         console.log(result);
        conv.ask(result['name']);
     });

  // TO RETURN TO DIALOGFLOW AND CONTINUE THE CONVERSATION, USE conv.ask()
    // conv.ask(`Let's chat some more.`);

  // TO RETURN TO DIALOGFLOW AND END THE CONVERSATION, USE conv.close()
    // conv.close(`Goodbye.`);
 });

exports.generateStarWarsUniverse = functions.https.onRequest(app);
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);