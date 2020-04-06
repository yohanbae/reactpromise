import React, {useState, useEffect} from "react";
import useInput from "../Hooks/useInput";
import { toast} from "react-toastify";
import styled, {createGlobalStyle} from "styled-components";
import { FaRegTrashAlt } from "react-icons/fa";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { GoDiffRemoved } from "react-icons/go";
import { MdRemoveCircleOutline} from "react-icons/md";


const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans+Condensed');
`


const InputWrap = styled.div`
    border:1px solid rgba(181, 209, 255, 0.6);
    padding:15px 10px; padding-right:15px;
    margin-bottom:5px;
    position:relative;
    box-sizing: border-box;
    z-index:2;

`;

const InputWrapExtra = styled.div`
    border:1px solid rgba(189, 50, 11, 0.3);
    padding:15px 10px;
    padding-right:15px;
    margin-bottom:5px;
    position:relative;
    box-sizing: border-box;
    z-index:2;
`;

const WholeBar = styled.div`
    position:absolute;
    width:100%;
    height:100%;
    top:0; left:0;
    width:30%;
    background:rgba(181, 209, 255, 0.4);
    transition:500ms linear;

    z-index:-1;
`;

const WholeBarExtra = styled.div`
    position:absolute;
    width:100%;
    height:100%;
    top:0; left:0;
    width:30%;
    background:rgba(189, 50, 11, 0.3);
    z-index:-1;
    transition:500ms linear;
`;

const InputTaskStyle = styled.input`
    width:100%;
    font-size:13px;border:0;
    margin:0;
    background:none;
    color:#535a7a;
    width: calc(100% - 15px);
    font-weight:100;
    z-index:15;
`;

const InputCurrent = styled.input`
    width:100%;
    font-size:10px;
    border:0;margin:0;
    margin-top:-2px;
    height:14px;
    color:#535a7a; background:none;
    text-align:center;
`;
const InputTotal = styled.input`
    width:100%;

    font-size:10px;
    border:0;margin:0;
    margin-top:-2px;
    height:14px;
    color:#535a7a; background:none;
    text-align:center;

`;
const ButtonDel = styled.button`
    width:15px;
    font-size:15px;        
    border:0; margin:0;
    background:none; color:#535a7a;
    text-align:right;
    z-index:5;
    cursor:pointer;
    opacity:0.7;
    &:focus {
        outline:0px;
    }
`;

const ProWrap = styled.div`
    height:13px;
    background:white; margin:0; padding:0;
    position:relative;
    left:0; bottom:0;
    border:1px solid rgba(174, 204, 197, 1);
    box-sizing: border-box;
    opacity:0;
    `;

const ProBar = styled.p`
    position:absoulte:
    left:0; bottom:0;
    height:11px;
    background:rgba(174, 204, 197, 0.6); margin:0; padding:0;
    transition:500ms linear;
`;

const LowWrap = styled.div`
    height:13px;
    display:grid;
    grid-gap:2px;
    grid-template-columns: 60% 19% 1% 20%;
    color:#535a7a;
    margin-top:15px;
    z-index:5;
`;
const SpanSlash = styled.span`
    font-size:10px;    margin-top:-2px;
    
`

const InputTask = ({theTask, theTaskCurrent, theTaskTotal, index, 
    updateTask, updateCurrentTask, updateTotalTask, deleteThisTask, updatePercent, extra=false}) => {
    // const [task, setTask] = useState("");
    // setTask(theTask);
    const task = useInput(theTask);
    const taskCurrent = useInput(theTaskCurrent);
    const taskTotal = useInput(theTaskTotal);

    const [progress, setProgress] = useState();
    useEffect(() => {
        let meme = Math.floor(taskCurrent.value / taskTotal.value * 100) + "%";
        setProgress(meme);
    }, []);

    const handleChange = (event) => {    task.setValue(event.target.value);   };
    const handleCurrentChange = (event) => { taskCurrent.setValue(event.target.value); };
    const handleTotalChange = (event) => {    taskTotal.setValue(event.target.value);   };

    const update = () => {
        if(task.value == ""){
            task.setValue("Task");
            updateTask(index, "Task");
            toast.error("Please enter correct name", {hideProgressBar: true});
        }else{
            updateTask(index, task.value);
        }
    }

    const updateCurrent = () => {
        if(parseInt(taskCurrent.value) <= parseInt(taskTotal.value)){
            updateCurrentTask(index, taskCurrent.value);
            updateProgress();     
        } else{
            toast.error("Number must be lower than Total", {hideProgressBar: true});
            taskCurrent.setValue(taskTotal.value);
        }
    }

    const updateTotal = () => {
        if(parseInt(taskTotal.value) < parseInt(taskCurrent.value)){
            toast.error("Number must be bigger than Current Progress", {hideProgressBar: true});
            taskTotal.setValue(taskCurrent.value);
        } else if (parseInt(taskTotal.value) === 0){
            toast.error("Number must be bigger than 0", {hideProgressBar: true});
            taskTotal.setValue(10);
        } else{
            updateTotalTask(index, taskTotal.value);   
            updateProgress();                 
        }
    }

    const deleteTask = () => {
        deleteThisTask(index);
    }

    const onPress = (event) => {
        if(event.charCode >= 48 && event.charCode <= 57){
            //
        } else {
            event.preventDefault();
        }
    }

    const updateProgress = () => {
        let meme = Math.floor(taskCurrent.value / taskTotal.value * 100) + "%";
        setProgress(meme);
        updatePercent();
    }


    const confirmOptions = {
        title: 'Delete Task',
        message: 'Are you sure?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => deleteTask()
          },
          {
            label: 'No',
            onClick: () => console.log('do nothing')
          }
        ]
      };
       

    return (
        <>
        <GlobalStyles />
        {(extra == true) ?
        <InputWrapExtra>
            <InputTaskStyle type="text" value={task.value} onChange={handleChange} onBlur={update} />
            <ButtonDel onClick={()=> confirmAlert(confirmOptions)}><MdRemoveCircleOutline /></ButtonDel>

            <LowWrap>
                <ProWrap><ProBar style={{width: progress }}></ProBar></ProWrap>
                <InputCurrent type="text" min="0" onKeyPress={onPress} value={taskCurrent.value} onChange={handleCurrentChange} onBlur={updateCurrent} />
                <SpanSlash>/</SpanSlash>
                <InputTotal type="text" min="1" onKeyPress={onPress} value={taskTotal.value} onChange={handleTotalChange} onBlur={updateTotal} />

            </LowWrap>
            <WholeBarExtra style={{width: progress }}></WholeBarExtra>
        </InputWrapExtra>
        :
        <InputWrap>
            <InputTaskStyle type="text" value={task.value} onChange={handleChange} onBlur={update} />
            <ButtonDel onClick={()=> confirmAlert(confirmOptions)}><MdRemoveCircleOutline /></ButtonDel>

            <LowWrap>
                <ProWrap><ProBar style={{width: progress }}></ProBar></ProWrap>
                <InputCurrent type="text" min="0" onKeyPress={onPress} value={taskCurrent.value} onChange={handleCurrentChange} onBlur={updateCurrent} />
                <SpanSlash>/</SpanSlash>
                <InputTotal type="text" min="1" onKeyPress={onPress} value={taskTotal.value} onChange={handleTotalChange} onBlur={updateTotal} />
            </LowWrap>
            <WholeBar style={{width: progress }}></WholeBar>
        </InputWrap>        
        }
        </>
    )
}

export default InputTask;