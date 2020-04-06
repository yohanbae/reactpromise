import React, {useState} from "react";
import firebase from "../base";

const GetUid = () => {
    const [uid, setUid] = useState();

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            setUid(user.uid);
        }
    });
    return uid;
}

export default GetUid;