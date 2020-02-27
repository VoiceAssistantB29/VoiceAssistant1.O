// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'voiceassistantb29@gmail.com',
        pass: 'Bayes@123'
    }
});

 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
  function sendEmailHandler(agent){
   const { email,name }=agent.parameters;
    const mailOptions = {
    from: "Voice Assistant", // sender address
    to: email, // list of receivers
    subject: "Email from voice assistant", // Subject line
    html: "<p> Hello $(name) </p>"
     };
    transporter.sendMail(mailOptions, function (err, info) {
    if(err)
    {
      console.log(err);
    }
    });
  }
  

  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  function calendar_pdfHandler(agent) {
  agent.add(`Click button below to download the pdf`);
     agent.add(new Card({
        "title": "Calendar of events",
        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/geetha-uvabku.appspot.com/o/1414746629gsss1.jpg?alt=media&token=6b4a457e-550f-4f3c-b38e-311fd592e969",
         //text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
         buttonText: "events.pdf",
         buttonUrl: "https://firebasestorage.googleapis.com/v0/b/geetha-uvabku.appspot.com/o/College%20Calendar%20of%20events%20Even%20sem%202020_20200201_0001.pdf?alt=media&token=57469cf1-14c4-4a32-90f4-eacb51983b72"
       })
    );
  }
  function about_gsssietwHandler(agent) {
  agent.add(`GSSSIETW, Mysuru is an initiative and outcome of Late Prof. B S Pandit, retired as Physics Professor from SJCE, Mysuru with a vision to provide quality technical education to girls. The institution was established in the year 2003. There are six engineering branches CSE,ECE,EEE,EIE,ISE,TCE.What else can I do for you?Have a look at our college website`);
     agent.add(new Card({
        "title": "GSSSIETW website",
        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/geetha-uvabku.appspot.com/o/1414746629gsss1.jpg?alt=media&token=6b4a457e-550f-4f3c-b38e-311fd592e969",
         //text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
         
         buttonText: "Click here",
         buttonUrl: "http://www.geethashishu.in/",
           })
    );
  } 
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }
  
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('calendar_pdf',calendar_pdfHandler); 
  intentMap.set('sendemail',sendEmailHandler);
  intentMap.set('about_gsssietw',about_gsssietwHandler);
    
         // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
