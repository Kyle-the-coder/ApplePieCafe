
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "restuarantsite.firebaseapp.com",
    projectId: "restuarantsite",
    storageBucket: "restuarantsite.appspot.com",
    messagingSenderId: "1006709987339",
    appId: "1:1006709987339:web:084dd0988794f1747ccf0e",
    measurementId: "G-9S4RY7Y9DT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth() 
export const storage = getStorage(app)
