import * as firebase from "firebase";
var config = {
  apiKey: "AIzaSyChfjcZ2e2A5jADYBQ07IUu-ej6ruYleVw",
  authDomain: "paka-7286a.firebaseapp.com",
  databaseURL: "https://paka-7286a.firebaseio.com",
  projectId: "paka-7286a",
  storageBucket: "paka-7286a.appspot.com",
  messagingSenderId: "804332044454"
};

export const firebaseData = firebase.initializeApp(config);
