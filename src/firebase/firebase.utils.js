import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const config = {
  apiKey: "AIzaSyB8hQ4VAtUmMRcJO9nRscX-d3kE4TPd198",

  authDomain: "crwn-db-52385.firebaseapp.com",

  projectId: "crwn-db-52385",

  storageBucket: "crwn-db-52385.appspot.com",

  messagingSenderId: "61147909715",

  appId: "1:61147909715:web:17d955796d3691c33200a6",

  measurementId: "G-Y8HDK9D12B",
};

initializeApp(config);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const firestore = getFirestore();
export const auth = getAuth();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider).catch(error => {
    //handle errors here
    const errorCode = error.code;
    const errorMessage = error.message;
    //the email of the user's account used
    const email = error.email;
    //the AuthCredential type that was used to sign
    const credential = GoogleAuthProvider.credentialFromError(
      errorCode,
      errorMessage
    );
    //do whatever to handle errors here
    console.log({
      errorCode,
      errorMessage,
      email,
      credential,
    });
  });
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(firestore, `users/${userAuth.uid}`);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};
