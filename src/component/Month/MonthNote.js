import React, {useState, useEffect, forwardRef, useImperativeHandle} from "react";
import styled from "styled-components";

import firebase from "../../base"

const MonthTitle = styled.div`
    margin-top:40px;
    margin-bottom:10px;
    color:#8490bb;
`;

const MonthNote = forwardRef(({theData, uid, mcode }, ref) => {

    const [noteData, setNoteData] = useState("empty note");
    const db = firebase.firestore();

    let note;
    useEffect(() => {
        if(theData['note']){
            if(theData['note'][mcode]){
              let theNote = theData['note'][mcode].note;
              setNoteData(theNote);
            }      
            console.log('current monthcode', note);
        }
    }, [theData]);

    useImperativeHandle(ref, () => ({
        getNoteFromChild(newCode) {
            if(theData['note']){
                if(theData['note'][newCode]){
                  let theNote = theData['note'][newCode].note;
                  setNoteData(theNote);
                }else{
                    setNoteData("");
                }  
            }
        }    
    }));


    const handleNoteChange = (event) => {
        setNoteData(event.target.value);
    };

    const saveNote = () => {
        console.log("mcode ", mcode);
        theData['note'][mcode] = {note: noteData};
        db.collection("izgym").doc(uid).set({ ...theData });
    }

    return (
    <div>
        <MonthTitle>MONTHLY NOTE</MonthTitle>
        <textarea placeholder="Write your monthly plan here" style={{resize: "none"}} className="daily-note" onChange={handleNoteChange} onBlur={saveNote} value={noteData}>
        </textarea>
    </div>    
    )

});

export default MonthNote;