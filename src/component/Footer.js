import React from "react";
import styled from "styled-components";

const FooterDown = styled.div`
    background:#8490bb;
    text-align:center;
    color:white;
    font-size:10px;
    position: fixed;
    left:0; bottom:0;
    width:100vw;
    z-index:100;
    padding:3px;
`;

const Footer = () => {
    return (
        <FooterDown>HANISON DEV</FooterDown>
    )
}

export default Footer;