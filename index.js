
// STARTER CODE FOR A CLOUD FUNCTION THAT IS THE FULFILLMENT FOR AN ACTION ON GOOGLE
// Init
'use strict';

const {dialogflow} = require('actions-on-google');

const functions = require('firebase-functions');

const swapi = require('swapi-node');

const app = dialogflow({debug:true});

let URL_ROOT = "https://swapi.co/api/";




//const { Logging } = require('@google-cloud/logging');




// SAMPLE INTENT HANDLER
 app.intent("test", (conv) => {
     console.log("inside first test intent");

    // resolve handles 200 status codes, reject handles 500.

        swapi.getPerson(1).then((result) => {
            console.log(result);
            if (result) {
                resolve(result);
            }
            else reject ("Something went wrong");
        });

  

    //  let newVariable = "Luke Skywalker";
    //       conv.ask(newVariable);

  // LOGIC FOR THIS INTENT GOES HERE:

    // let Luke = "";
    // Luke = Luke.getPerson(1);
    
    // code not being triggered
    //  swapi.getPerson(1).then((result) => {
    //      console.log('inside swapi promise call');
    //      console.log(result);
    //     conv.ask(result['name']);
     });

  // TO RETURN TO DIALOGFLOW AND CONTINUE THE CONVERSATION, USE conv.ask()
    // conv.ask(`Let's chat some more.`);

  // TO RETURN TO DIALOGFLOW AND END THE CONVERSATION, USE conv.close()
    // conv.close(`Goodbye.`);
 

 exports.generateStarWarsUniverse = functions.https.onRequest(app);

//  exports.retrieveSWAPIData = functions.https.onRequest((data, context) => {
//   return new Promise(function(resolve, reject) {
//     request({
//       url: BASE_URL,
//       method: "POST",
//       json: true,
//       body: queryJSON //A json variable I've built previously
//     }, function (error, response, body) {
//       if (error) {
//         reject(error);
//       } 
//       else {
//         resolve(body)
//       } 
//     });
//   });
// });


