import React, {useEffect} from "react";
import styled from "styled-components";
import updating_gif from "../assets/updating.gif";

const UpdatingWrap = styled.div`
    width:100%;
    height:100vh;
    display:grid;
    justify-content:center;
    align-items:center;
    font-size:20px;
`;

const Updating = ({history}) => {
    useEffect(() => {
        console.log('ready');
        setTimeout(() => {
            history.goBack();
        }, 1000);
    }, []);

    return (
        <UpdatingWrap>
            <img src={updating_gif} />
        </UpdatingWrap>
    )
}

export default Updating;