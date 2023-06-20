import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAFyJXCJz5FcR3WF1eqAyFb7a2yPwzMp_w",
    authDomain: "dashboard-final.firebaseapp.com",
    projectId: "dashboard-final",
    storageBucket: "dashboard-final.appspot.com",
    messagingSenderId: "486735467064",
    appId: "1:486735467064:web:11151c535877bbd4270ccd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth }