import React, {useEffect} from "react";
import firebase from "../base";
import InputTask from "./InputTask";
import styled from "styled-components";
// import Week from './style';



const Week = styled.div`
    padding:0 10px 10px 10px;
`;

const H5 = styled.h5`
    font-size:12px;
    margin:0; padding:0; margin-bottom:5px;
    color:#8490bb;
    font-weight:300;
    text-transform: uppercase;
    text-align:center;
`;
const Hdate = styled.h1`
    font-size:20px;
    color:#8490bb;
    font-weight:300;
    text-align:center;
    padding:10px 0; margin:0;    
`;

const DayTop = styled.div`

padding-bottom:15px;
`;
let count = 0;

const DayTask = ({ theDay, dayId, uid, theData, theDate, assignPercent, updateGogo }) => {
    let tasks = [];
    let extras = [];

    const db = firebase.firestore();

    const updateTask = (i, text) => {
        theData[dayId][i].name = text;
        let final=[]; 
        final[dayId] = theData[dayId];
        db.collection("izgym").doc(uid).set({ ...theData, ...final });
    }
    const updateCurrentTask = (i, current) => {
        theData[dayId][i].current = current;
        let final=[]; 
        final[dayId] = theData[dayId];
        db.collection("izgym").doc(uid).set({ ...theData, ...final });
    }
    const updateTotalTask = (i, total) => {
        theData[dayId][i].total = total;
        let final=[]; 
        final[dayId] = theData[dayId];
        db.collection("izgym").doc(uid).set({ ...theData, ...final });
    }    

    const deleteThisTask = (i) => {
        theData[dayId].splice(i, 1);
        console.log(theData[dayId]);
        db.collection("izgym").doc(uid).set({ ...theData });        
        console.log("HOHO ",tasks[dayId]);

        console.log(i);
    }

    //EXTRA PART
    const updateExtra = (i, text) => {
        theData['extra'][dayId][i].name = text;
        db.collection("izgym").doc(uid).set({ ...theData, extra: { ...theData['extra'] }  });

    }
    const updateCurrentExtra = (i, current) => {
        theData['extra'][dayId][i].current = current;
        db.collection("izgym").doc(uid).set({ ...theData, extra: { ...theData['extra'] }  });
    }
    const updateTotalExtra = (i, total) => {
        theData['extra'][dayId][i].total = total;
        db.collection("izgym").doc(uid).set({ ...theData, extra: { ...theData['extra'] }  });
    }    

    const deleteThisExtra = (i) => {
        theData['extra'][dayId].splice(i, 1);
        extras = theData['extra'][dayId];
        db.collection("izgym").doc(uid).set({ ...theData });     
        updateGogo();
    }

    if(theData[dayId] === undefined){
        if(theData["template"] !== undefined){
            if(theData["template"][theDay]) {
                tasks = theData["template"][theDay];         
            }
        }
    }else {
        tasks = theData[dayId];
    }

    if(theData['extra']){
        if(theData['extra'][dayId] === undefined){
            // extras[dayId] = [];
        }else{
            extras = theData['extra'][dayId];
        }
    }


    // console.log("EXTRA", extras);

    const updatePercent = () => {
        assignPercent(dayId, theData);
    }

    return (
        <Week>
            <DayTop>
                <Hdate>{theDate}</Hdate>
                <H5>{theDay}</H5>
            </DayTop>
            {
                // let 발류를 만들어서 여따가 default 를 넣어보는건
                tasks.map((task, index) => (
                <div key={"task"+index}>
                    <InputTask 
                        theTask={task.name} theTaskCurrent={task.current} 
                        theTaskTotal={task.total} index={index} 
                        updateTask={updateTask} 
                        updateCurrentTask={updateCurrentTask}
                        updateTotalTask={updateTotalTask}
                        deleteThisTask={deleteThisTask}
                        updatePercent={updatePercent}
                    />
                </div>
                ))
            }

            {
                extras.map((extra, index) => (
                    <div key={"extra"+index}>
                        <InputTask
                            theTask={extra.name} theTaskCurrent={extra.current} 
                            theTaskTotal={extra.total} index={index} 
                            updateTask={updateExtra} 
                            updateCurrentTask={updateCurrentExtra}
                            updateTotalTask={updateTotalExtra}
                            deleteThisTask={deleteThisExtra}
                            updatePercent={updatePercent}
                            extra={true}
                        />
                    </div>
                ))
            }
        </Week>
    )

}

export default DayTask;