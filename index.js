// STARTER CODE FOR A CLOUD FUNCTION THAT IS THE FULFILLMENT FOR AN ACTION ON GOOGLE
// Init
'use strict';

const {dialogflow, BasicCard, SimpleResponse} = require('actions-on-google');

const functions = require('firebase-functions');

//const swapi = require('swapi-node');

const app = dialogflow({debug:true});

let request = require('request');

// ROOTS that reference swapi

const URL_ROOT = "https://swapi.co/api/";

const FILMS_ROOT = "https://swapi.co/api/films";





const LUKE_ROOT = "people/1";




//const { Logging } = require('@google-cloud/logging');




// SAMPLE INTENT HANDLER
 app.intent("test", (conv) => {
     console.log("inside first test intent");
    let url = URL_ROOT + LUKE_ROOT;
   
    console.log(url);

    let getLukeSkywalker = (url) => {
        console.log("inside getter");
        return new Promise(
            (resolve, reject) => {
                console.log("inside promise");
                request.get(url, function(error, response, data){
                    if (error) reject(error);
                   // .parse does the opposite of .stringify
                    let content = JSON.parse(data);
                    let name = content["name"];
                    console.log(content);
                    console.log(name);
                    resolve(name);
                        })
                    }
                );
            };
    // google function thinks everything is done and want decipher promise unless you use return here
   return getLukeSkywalker(url).then((luke) => {
      console.log("Luke variable set..." + luke);
      conv.ask(new SimpleResponse({
          speech: "This is a response " + luke,
          text: "This is a response " + luke,
      }))
    })
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
                    if (error) reject(error);
                   // .parse does the opposite of .stringify
                    let content = JSON.parse(data);
                    let film = content.results.title
                    console.log(content);
                    console.log(film);
                    resolve(film);
                        })
                    }
                );
            };
    // google function thinks everything is done and want decipher promise unless you use return here
   return getFilms(url).then((param) => {
      console.log("Luke variable set..." + param);
      conv.ask(new SimpleResponse({
          speech: param,
          text: param,
      }))
    })
});
  // TO RETURN TO DIALOGFLOW AND CONTINUE THE CONVERSATION, USE conv.ask()
    // conv.ask(`Let's chat some more.`);

  // TO RETURN TO DIALOGFLOW AND END THE CONVERSATION, USE conv.close()
    // conv.close(`Goodbye.`);
 

 exports.generateStarWarsUniverse = functions.https.onRequest(app);