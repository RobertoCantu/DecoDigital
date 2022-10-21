import {initializeApp} from 'firebase/app';
import {getAuth, RecaptchaVerifier} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAp8IUGrQOy8dkiH-hJa1hj0YfD_1HeiBQ",
    authDomain: "deco-digital.firebaseapp.com",
    projectId: "deco-digital",
    storageBucket: "deco-digital.appspot.com",
    messagingSenderId: "125906414811",
    appId: "1:125906414811:web:b94bcddd489d872a3eb0fe",
    measurementId: "G-J01MQ36989"
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);