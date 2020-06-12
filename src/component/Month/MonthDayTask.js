import React from "react";
import styled from "styled-components";
// import Week from './style';

const Week = styled.div`
    padding:15px 10px;
    border-radius:5px;
`;

const H5 = styled.h5`
    font-size:11px;
    margin:0; padding:0; margin-bottom:5px;
    color:#8490bb;
    text-align:right;
    position:relative;
    font-weight:300;
    padding-right:10px;
    margin-bottom:15px;
    &::after{
        position:absolute;
        bottom:-5px; right:5px;
        border-bottom:1px solid rgba(132, 144, 187, 0.5);
        width:40%;
        height:5px;
        content:'';
    }
`;

const H6 = styled.h6`
    margin:0; padding:0;
    padding-right:10px;
    text-align:right;
    font-size:12px;
    color:#35394a;
    font-weight:300;
`;

const MonthDayTask = ({ theDay, dayId, theData, theDate }) => {
    let extras = [];

    if(theData['extra']){
        if(theData['extra'][dayId] === undefined){
            // extras[dayId] = [];
        }else{
            extras = theData['extra'][dayId];
        }
    }


    return (
        <Week>
            <H5>{theDate}</H5>
            {
                extras.map((extra, index) => (
                    <div key={"monthextra"+index}>
                        <H6>{extra.name}</H6>
                    </div>
                ))
            }
        </Week>
    )

}

export default MonthDayTask;