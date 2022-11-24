import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';

const firebaseConfig = {
	// Config ADR 
	// apiKey: 'AIzaSyAp8IUGrQOy8dkiH-hJa1hj0YfD_1HeiBQ',
	// authDomain: 'deco-digital.firebaseapp.com',
	// projectId: 'deco-digital',
	// storageBucket: 'deco-digital.appspot.com',
	// messagingSenderId: '125906414811',
	// appId: '1:125906414811:web:b94bcddd489d872a3eb0fe',
	// measurementId: 'G-J01MQ36989',

	// Config deco 
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
