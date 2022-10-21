"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import firebase 
const app_1 = require("firebase/app");
const firebaseConfig = {
    apiKey: "AIzaSyAp8IUGrQOy8dkiH-hJa1hj0YfD_1HeiBQ",
    authDomain: "deco-digital.firebaseapp.com",
    projectId: "deco-digital",
    storageBucket: "deco-digital.appspot.com",
    messagingSenderId: "125906414811",
    appId: "1:125906414811:web:b94bcddd489d872a3eb0fe",
    measurementId: "G-J01MQ36989"
};
// Initialize Firebase
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.default = app;
