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

const PEOPLE_ROOT = "https://swapi.co/api/people";

const PLANETS_ROOT = "https://swapi.co/api/planets";

const SPECIES_ROOT = "https://swapi.co/api/species";

const STARSHIPS_ROOT = "https://swapi.co/api/starships";

const VEHICLES_ROOT = "https://swapi.co/api/vehicles";


const LUKE_ROOT = "people/1";




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

    // resolve with .then handles 200 status codes, reject handles 500.
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
                    let films = content;
                    let newHope = content.results.title
                    //let name = content["name"];
                    console.log(content);
                    console.log(films.newHope);

                    resolve(newHope);


                 

                        })
                    }
                );
            };
    // google function thinks everything is done and want decipher promise unless you use return here
   return getFilms(url).then((fil) => {
      console.log("New Hope variable set." + fil);

      conv.ask(new SimpleResponse({
          speech: fil,
          text:  fil,
      }))
    })

});

// RETURN FILM INTENT 

    let url = URL_ROOT + LUKE_ROOT;
   
    console.log(url);

    let getLukeSkywalker = (url) => {
        console.log("inside getter");
        return new Promise(
            (resolve, reject) => {
                console.log("inside promise");
                //failhere maybe?
                request.get(url, function(error, response, data){
                    if (error) reject(error);

                   // .parse does the opposite of .stringify
                    let content = JSON.parse(data);
                    let name = content["name"];
                    console.log(content);
                    console.log(name);
                    resolve(name);

                    //  getLukeSkywalker.then(function(nme) {
                    //       console.log("resolved "+ nme);
                    //       return nme;
                    //  });

                        })
                    }
                );
            };
    // google function thinks everything is done and want decipher promise unless you use return here
   return getLukeSkywalker(url).then((luke) => {
      console.log("Luke variable set..." + luke);

      //break here?  data is in console.log above
      conv.ask(new SimpleResponse({
          speech: "This is a response " + luke,
          text: "This is a response " + luke,
      }))
    })

});
  // TO RETURN TO DIALOGFLOW AND CONTINUE THE CONVERSATION, USE conv.ask()
    // conv.ask(`Let's chat some more.`);

  // TO RETURN TO DIALOGFLOW AND END THE CONVERSATION, USE conv.close()
    // conv.close(`Goodbye.`);
 

 exports.generateStarWarsUniverse = functions.https.onRequest(app);
