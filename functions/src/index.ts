import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";

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

//Express
//npm instal express cors  ----folder functions
//npm install @types/express --save-dev
//npm install @types/cors --save-dev

const app = express();
app.use(cors({ origin: true }));
app.get("/goty", async (req, res) => {
  const gotyRef = db.collection("goty");
  const docsSnap = await gotyRef.get();
  const juegos = docsSnap.docs.map((doc) => doc.data());

  res.json(juegos);
});

export const api = functions.https.onRequest(app);
