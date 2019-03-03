
// STARTER CODE FOR A CLOUD FUNCTION THAT IS THE FULFILLMENT FOR AN ACTION ON GOOGLE
// Init
'use strict';

const {dialogflow} = require('actions-on-google');

const functions = require('firebase-functions');

const swapi = require('swapi-node');

const app = dialogflow({debug:true});

let request = require('request');

const URL_ROOT = "https://swapi.co/api/";

const PEOPLE_ROOT = "people/1";




//const { Logging } = require('@google-cloud/logging');




// SAMPLE INTENT HANDLER
 app.intent("test", (conv) => {
     console.log("inside first test intent");




            // old swapi-node library code 

        // swapi.getPerson(1).then((result) => {
        //     console.log(result.name);
        //     if (result) {
        //         var characterName = result.name;
        //         conv.ask(characterName);
        //         resolve(result);
        //     }
        //     else reject ("Something went wrong");
        // });

  

   

  // LOGIC FOR THIS INTENT GOES HERE:

    // A function that returns a promise to resolve into the data fetched from API

    // resolve handles 200 status codes, reject handles 500.

    let getLukeSkywalker = (URL_ROOT+PEOPLE_ROOT) => {
        return new Promise(
            (resolve, reject) => {
                request.get(URL_ROOT+PEOPLE_ROOT, function(error, response, data){
                    if (error) reject(error);

    let content = JSON.parse(data);
            let name = content.name;
            console.log(name);
            conv.ask(name);
            resolve(name);
                })
            }
        )
    }

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


