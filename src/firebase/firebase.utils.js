import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyB8hQ4VAtUmMRcJO9nRscX-d3kE4TPd198",

  authDomain: "crwn-db-52385.firebaseapp.com",

  projectId: "crwn-db-52385",

  storageBucket: "crwn-db-52385.appspot.com",

  messagingSenderId: "61147909715",

  appId: "1:61147909715:web:17d955796d3691c33200a6",

  measurementId: "G-Y8HDK9D12B",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
