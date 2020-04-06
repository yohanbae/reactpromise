import React, {useEffect} from "react";
import styled from "styled-components";
import SideInputTask from "./SideInputTask";
import firebase from "../../base";

const TaskWrap = styled.div`
`;
const DayName = styled.div`
    margin-bottom:10px;
    color:#8490bb;
`;



const SideDayTask = ({ dayId, theData, uid, theDay, percent, assignPercent }) => {
    let datas = [];
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
        db.collection("izgym").doc(uid).set({ ...theData });        
    }

    const updatePerfect = () => {
        assignPercent(dayId, theData);
    }

    if(theData[dayId]){
        datas = theData[dayId];
    }else{
        if(theData['template']){
            theData[dayId] = theData['template'][theDay];
            db.collection("izgym").doc(uid).set({ ...theData });
        }
    }

    if(theData['extra']){
        if(theData['extra'][dayId] === undefined){
        }else{
            extras = theData['extra'][dayId];
        }
    }

    return (
        <TaskWrap>
        <DayName style={{ textTransform: 'uppercase'}}> {theDay} TASK LIST</DayName>
        {
            datas.map((task, index) => (
                <div key={"side"+task.name+index}>
                    <SideInputTask 
                        theTask={task.name} theTaskCurrent={task.current} 
                        theTaskTotal={task.total} index={index} 
                        updateTask={updateTask} 
                        updateCurrentTask={updateCurrentTask}
                        updateTotalTask={updateTotalTask}
                        deleteThisTask={deleteThisTask}
                        updatePerfect={updatePerfect}
                    />
                </div>              
            ))
        }
        {
            extras.map((extra, index) => (
                <div key={"sideextra"+extra.name+index}>
                <SideInputTask
                    theTask={extra.name} theTaskCurrent={extra.current} 
                    theTaskTotal={extra.total} index={index} 
                    updateTask={updateExtra} 
                    updateCurrentTask={updateCurrentExtra}
                    updateTotalTask={updateTotalExtra}
                    deleteThisTask={deleteThisExtra}
                    updatePerfect={updatePerfect}
                    extra={true}
                />
                </div>
            ))
        }
        </TaskWrap>

    )

}

export default SideDayTask;