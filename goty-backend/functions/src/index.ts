import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://firestore-grafica-64182.firebaseio.com"
});

const bdd = admin.firestore();


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
    response.json({ mensaje: 'Hola mundo desde Funciones de Firebase'});
});

export const getGOTY = functions.https.onRequest(async(request, response) => {
    
    const gotyRef = bdd.collection('goty');
    const docsSnap = await gotyRef.get();
    const juegos = docsSnap.docs.map(doc => doc.data());

    response.json(juegos);

});
   