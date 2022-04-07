// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCDhuPavqbAPQfevv1WB36rpzfuRAGNB9M",
    authDomain: "email-pass-auth-4e9c6.firebaseapp.com",
    projectId: "email-pass-auth-4e9c6",
    storageBucket: "email-pass-auth-4e9c6.appspot.com",
    messagingSenderId: "984036177768",
    appId: "1:984036177768:web:6275cf309e7dd48a54c8dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;