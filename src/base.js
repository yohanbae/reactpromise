import firebase from "firebase";

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: "izgym-c8569",
    storageBucket: "izgym-c8569.appspot.com",
    messagingSenderId: "914604649889",
    appId: "1:914604649889:web:7613ada195c7694f03efe0",
    measurementId: "G-H09VWD76TE"
}

firebase.initializeApp(config);
export default firebase;
