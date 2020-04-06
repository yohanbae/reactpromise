import React from "react";
import useInput from "../Hooks/useInput";
import {toast} from "react-toastify";
import styled from "styled-components";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdRemoveCircleOutline} from "react-icons/md";

const InputWrap = styled.div`
    border:1px solid rgba(132, 144, 187, 0.6);
    padding:15px 10px;
    padding-left:20px;
    margin-bottom:5px;
    position:relative;
`;

const InputTaskStyle = styled.input`
    width:100%;
    font-size:13px;border:0;
    margin:0;
    background:none;
    color:#8490bb;
    width: calc(100% - 15px);
`;

const InputTotal = styled.input`
    width:100%;
    font-size:13px;
    border:0;margin:0;
    height:14px;
    color:#8490bb; background:none;
    text-align:left;

`;
const ButtonDel = styled.button`
    font-size:13px;        
    margin:0;
    border:none;
    background:none; color:#8490bb;
    text-align:right;
    cursor:pointer;
`;

const LowWrap = styled.div`
    height:13px;
    display:grid;
    grid-gap:2px;
    grid-template-columns: 1fr 1fr;
    color:white;
    margin-top:15px;
`;

const InputTemplateTask = ({name, total, index, updateTask, updateTotalTask, deleteTask}) => {
    const task = useInput(name);
    const taskTotal = useInput(total);

    const handleChange = (event) => {    task.setValue(event.target.value);   };
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

    const updateTotal = () => {
        if (parseInt(taskTotal.value) === 0){
            toast.error("Number must be bigger than 0");
            taskTotal.setValue(10);
        } else{
            updateTotalTask(index, taskTotal.value);   
        }
    }

    const deleteThisTask = () => {
        deleteTask(index);
    }

    const onPress = (event) => {
        if(event.charCode >= 48 && event.charCode <= 57){
            //
        } else {
            event.preventDefault();
        }
    }

    return (
        <InputWrap>
            <InputTaskStyle value={task.value} onChange={handleChange} onBlur={update} />
            <LowWrap>
                <InputTotal value={taskTotal.value} onKeyPress={onPress} onChange={handleTotalChange} onBlur={updateTotal} />
                <ButtonDel onClick={deleteThisTask}><MdRemoveCircleOutline /></ButtonDel>
            </LowWrap>
        </InputWrap>
    )
};

export default InputTemplateTask;