// import Rebase from 're-base';
import firebase from "firebase";

const config = {
    apiKey: "AIzaSyAv-TOnRygJdXE3UXXTVtBWr9_YwpdA8G4",
    authDomain: "izgym-c8569.firebaseapp.com",
    databaseURL: "https://izgym-c8569.firebaseio.com",
    projectId: "izgym-c8569",
    storageBucket: "izgym-c8569.appspot.com",
    messagingSenderId: "914604649889",
    appId: "1:914604649889:web:7613ada195c7694f03efe0",
    measurementId: "G-H09VWD76TE"
}

firebase.initializeApp(config);
// const base = Rebase.createClass(app.database());
export default firebase;
// export {base};