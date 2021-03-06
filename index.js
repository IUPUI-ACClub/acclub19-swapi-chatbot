// STARTER CODE FOR A CLOUD FUNCTION THAT IS THE FULFILLMENT FOR AN ACTION ON GOOGLE
// Init
'use strict';

const {dialogflow, BasicCard, SimpleResponse} = require('actions-on-google');

const functions = require('firebase-functions');

const swapi = require('swapi-node');

const app = dialogflow({debug:true});

let request = require('request');

// ROOTS that reference swapi

const URL_ROOT = "https://swapi.co/api/";

const FILMS_ROOT = "films/1";





const LUKE_ROOT = "people/1";




//const { Logging } = require('@google-cloud/logging');




// SAMPLE INTENT HANDLER
 app.intent("test", (conv) => {
     console.log("inside first test intent");
   

    return swapi.getPerson(1).then((result) => {
        console.log(result);
        console.log(result.name);
        console.log(result.height);

           conv.ask(new SimpleResponse({
          speech: "The jedi is " + result.name + " his height is " + result.height,
          text: "The jedi is " + result.name + " his height is " + result.height,
      }))

    });
  
});

// MOVIE INTENT HANDLER
 app.intent("userRequestsFilms", (conv) => {
     console.log("inside first test intent");
    let url = URL_ROOT + FILMS_ROOT;
   
    console.log(url);

    let getFilms = (url) => {
        console.log("inside getter");
        return new Promise(
            (resolve, reject) => {
                console.log("inside promise");
                request.get(url, function(error, response, data){
                    console.log(data);
                    if (error) reject(error);
                   // .parse does the opposite of .stringify
                    let content = JSON.parse(data);
                    let title = content.title;
                    let director = content.director
                    console.log(content);
                    console.log(title);
                    console.log(director);
                    //breaks
                    resolve(title, director);
                        });
                    }
                );
            };
    // google function thinks everything is done and want decipher promise unless you use return here
   return getFilms(url).then((param, param2) => {
      console.log("title set "+ param, param2);
      conv.ask(new SimpleResponse({
          speech: param + " the director is " + param2,
          text: param + " the director is " + param2,
      }))
    })
});
  // TO RETURN TO DIALOGFLOW AND CONTINUE THE CONVERSATION, USE conv.ask()
    // conv.ask(`Let's chat some more.`);

  // TO RETURN TO DIALOGFLOW AND END THE CONVERSATION, USE conv.close()
    // conv.close(`Goodbye.`);
 

 exports.generateStarWarsUniverse = functions.https.onRequest(app);