import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const serviceAccount = require("./serviceAccountkey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export const helloWorld = functions.https.onRequest((request, response) => {
  response.json({ message: "Hola mundo desde funciones de Firebase!!!!" });
});

export const getGOTY = functions.https.onRequest(async (request, response) => {
  // const nombre = request.query.nombre || 'sin nombre';
  const gotyRef = db.collection("goty");
  const docsSnap = await gotyRef.get();
  const juegos = docsSnap.docs.map((doc) => doc.data());

  response.json(juegos);
});
