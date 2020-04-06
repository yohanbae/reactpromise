import React from "react";
import firebase from "../base";
import styled from "styled-components";
import InputTemplateTask from "./InputTemplateTask";
import { FiFilePlus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";

const Week = styled.div`
    padding:10px;
`;

const H5 = styled.h5`
    font-size:15px;
    margin:0; padding:0; margin-bottom:5px;
    color:#8490bb;
    font-weight:300;
    text-transform: uppercase;
    text-align:center;
`;

const ButtonAddTask = styled.button`
    width:100%;
    background:white;
    border:1px dashed #8490bb;
    color:#8490bb;
    cursor:pointer;
    padding-top:10px;
    padding-bottom:7px;
    transition:500ms;
    &:hover{
        opacity:0.6;
    }
`;


const TemplateTask = ({theData, day, dayIndex, uid, updateGogo}) => {
    const db = firebase.firestore();
    const updateTask = (i, text) => {
        theData['template'][day][i].name = text;
        db.collection("izgym").doc(uid).set({ ...theData });
        afterUpdateCleanDB();
    }

    const updateTotalTask = (i, total) => {
        theData['template'][day][i].total = total;
        db.collection("izgym").doc(uid).set({ ...theData });
        afterUpdateCleanDB();
    }

    const addTask = (day) => {
        theData['template'][day].push({name:"Task", current:0, total:10});
        db.collection("izgym").doc(uid).set({ ...theData });
        afterUpdateCleanDB();
    }

    const deleteTask = i => {
        theData['template'][day].splice(i, 1);
        db.collection("izgym").doc(uid).set({ ...theData, template:{ ...theData['template']} });   
        afterUpdateCleanDB();
        updateGogo();
    }

    const afterUpdateCleanDB = () => {
        let today = new Date();
        today.setDate(today.getDate() + dayIndex - today.getDay());
        let month = parseInt(today.getMonth()) + 1;
        let datecode = today.getFullYear() + "" + month + "" + today.getDate();

        delete theData[datecode];
        db.collection("izgym").doc(uid).set({ ...theData });
        console.log("EDITING", datecode);
    }


    return (
        <Week>
        <H5>{day}</H5>
        {
        (theData['template']) ?
        theData['template'][day].map((data,i) => (
            <div key={i} >             
            <InputTemplateTask name={data.name} index={i} total={data.total} updateTask={updateTask} updateTotalTask={updateTotalTask} deleteTask={deleteTask} />
            </div>
        ))
        : console.log('not yet')
        }
        <ButtonAddTask onClick={()=>addTask(day)}><GoPlus /></ButtonAddTask>
        </Week>
    )

}

export default TemplateTask;