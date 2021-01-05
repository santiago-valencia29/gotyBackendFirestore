import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

var serviceAccount = require("./serviceAccountkey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  response.json({ message: "Hola mundo desde funciones de Firebase!!!!" });
});
