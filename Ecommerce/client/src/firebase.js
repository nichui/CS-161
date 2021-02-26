import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDIwBv923LImaGHfxHdCiWOx17V_KEmvE4",
    authDomain: "tall-tail-travel.firebaseapp.com",
    projectId: "tall-tail-travel",
    storageBucket: "tall-tail-travel.appspot.com",
    messagingSenderId: "729909354145",
    appId: "1:729909354145:web:6d7a24325c277ee3e5dae0"
};
// Initialize Firebase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}


// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();