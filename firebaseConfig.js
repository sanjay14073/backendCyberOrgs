const {getAuth, EmailAuthProvider, reauthenticateWithCredential, signInWithCredential,signInWithEmailAndPassword}=require('firebase/auth');
const {initializeApp}=require("firebase/app");
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const firebaseConfig = {
  apiKey: "AIzaSyCbXaTW7MUbZ-DNmGrql-6R8Ic_YtIQDKM",
  authDomain: "ehr-user.firebaseapp.com",
  projectId: "ehr-user",
  storageBucket: "ehr-user.appspot.com",
  messagingSenderId: "958352063686",
  appId: "1:958352063686:web:58ca745e8dde1bca042bc7"
};
const appf = initializeApp(firebaseConfig);
const authi = getAuth(appf);
var admin = require("firebase-admin");
  
var serviceAccount = require('../backend/secretAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports=admin;