import {initializeApp} from 'firebase/app';
import {getAuth, RecaptchaVerifier} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCvtWE5zHteFT70hs7lB3l4ofxmllkCTbs",
    authDomain: "decodigital-8a595.firebaseapp.com",
    projectId: "decodigital-8a595",
    storageBucket: "decodigital-8a595.appspot.com",
    messagingSenderId: "769782145251",
    appId: "1:769782145251:web:bacab9849c7018a9e2a5d6",
    measurementId: "G-M9NQZQL8G6"
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);