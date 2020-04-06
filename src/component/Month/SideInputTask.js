import React, {useState, useEffect} from "react";
import useInput from "../../Hooks/useInput";
import { toast} from "react-toastify";
import styled from "styled-components";
import { FaRegTrashAlt } from "react-icons/fa";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { MdRemoveCircleOutline} from "react-icons/md";

const InputWrap = styled.div`
    background: rgba(174, 204, 197, 0.3);
    border:1px solid rgba(174, 204, 197, 0.6);
    padding:3px 10px;
    margin-bottom:5px;
    position:relative;
    padding-bottom:7px;
`;

const InputWrapExtra = styled.div`
    background:rgba(189, 50, 11, 0.1);
    padding:15px 10px;
    margin-bottom:5px;
    position:relative;
    border:1px solid rgba(189, 50, 11, 0.2);
    box-sizing: border-box;
`;

const InputTaskStyle = styled.input`
    width:100%;
    font-size:13px;border:0;
    margin:0;
    background:none;
    color:#535a7a;
    width: calc(100% - 25px);
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
    font-size:12px;        
    border:0; margin:0;
    background:none; color:#535a7a;
    cursor:pointer;
`;

const ProWrap = styled.div`
    height:13px;
    background:white; margin:0; padding:0;
    position:relative;
    left:0; bottom:0;
    border:1px solid rgba(174, 204, 197, 1);
    box-sizing: border-box;
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
    color:white;
    margin-top:3px;
`;
const SpanSlash = styled.span`
    font-size:10px;    margin-top:-2px;
`

const InputTask = ({theTask, theTaskCurrent, theTaskTotal, index, 
    updateTask, updateCurrentTask, updateTotalTask, deleteThisTask, updatePerfect, extra=false}) => {

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
        updatePerfect();
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
        {
        extra ?
        <InputWrapExtra>
            <InputTaskStyle type="text" value={task.value} onChange={handleChange} onBlur={update} />
            <ButtonDel onClick={()=> confirmAlert(confirmOptions)}><MdRemoveCircleOutline /></ButtonDel>
            <LowWrap>
                <ProWrap><ProBar style={{width: progress }}></ProBar></ProWrap>
                <InputCurrent type="text" min="0" onKeyPress={onPress} value={taskCurrent.value} onChange={handleCurrentChange} onBlur={updateCurrent} />
                <SpanSlash>/</SpanSlash>
                <InputTotal type="text" min="1" onKeyPress={onPress} value={taskTotal.value} onChange={handleTotalChange} onBlur={updateTotal} />

            </LowWrap>
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
        </InputWrap>
        }
        </>
    )
}

export default InputTask;