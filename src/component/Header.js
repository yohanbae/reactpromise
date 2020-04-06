import React from "react";
import firebase from "../base";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { IoMdLogOut,IoIosCalendar } from "react-icons/io";
import { FiList, FiEdit } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import finger from "../assets/finger-icon.png";

const HeaderWrap = styled.div`
    display:grid;
    grid-template-columns: 1fr 450px;
    width:100vw;
    position:fixed;
    top:0; left:0;
    padding-top:5px;
    padding-bottom:5px;
    background:#8490bb;
    z-index:100;
`;

    const HeaderTitle = styled.div`
    font-size:14px;
    color:white;
    font-weight:300;
    padding-left:30px;

    `;

const HeaderMenu = styled.div`
    display:grid; grid-gap:10px;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    font-size:14px;
    z-index:10;
    text-align:right;
`;

const TheLink = styled.div`
    cursor:pointer;
`;

const LinkWrap = styled.div`
    display:flex;
    align-items:center;
`;

const Header = ({current = 0}) => {

    const goOut = () => {
        firebase.auth().signOut();
        window.location.reload();
    }

    const confirmOptions = {
        title: 'Log out',
        message: 'Are you sure?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => goOut()
          },
          {
            label: 'No',
            onClick: () => console.log('do nothing')
          }
        ]
    };

    
    

    return (
        <HeaderWrap>
            <HeaderTitle>PROMISE</HeaderTitle>
            <HeaderMenu>
                <Link style={{ marginRight:'20px', textDecoration: 'none', color: (current === 0) ? '#f5d442' : '#fff' }} to="/main">
                    <LinkWrap>
                    <FiList style={{ textDecoration: 'none', fontSize:'15px', margin:'0', marginRight:'10px', padding:'0' }} />
                    <span style={{ textDecoration: 'none', fontSize:'14px', margin:'0', padding:'0' }} >WEEKLY</span> 
                    </LinkWrap>
                </Link>
                <Link style={{marginRight:'20px', textDecoration: 'none', color: (current === 1) ? '#f5d442' : '#fff' }} to="/month">
                    <LinkWrap>
                    <IoIosCalendar style={{ textDecoration: 'none', fontSize:'15px', margin:'0', marginRight:'10px', padding:'0' }} />
                    <span style={{ textDecoration: 'none', fontSize:'14px', margin:'0', padding:'0' }} >MONTHLY</span>                     
                    </LinkWrap>
                </Link>
                <Link style={{marginRight:'20px', textDecoration: 'none', color: (current === 2) ? '#f5d442' : '#fff' }} to="/edit">
                    <LinkWrap>
                    <FiEdit style={{ textDecoration: 'none', fontSize:'15px', margin:'0', marginRight:'10px', padding:'0' }} />
                    <span style={{ textDecoration: 'none', fontSize:'14px', margin:'0', padding:'0' }} >EDIT</span>                     
                    </LinkWrap>
                </Link>
                <TheLink style={{ textDecoration: 'none', color:'#fff'}} onClick={() => confirmAlert(confirmOptions)}>
                    <LinkWrap>
                    <IoMdLogOut style={{ textDecoration: 'none', fontSize:'15px', margin:'0', marginRight:'10px', padding:'0' }} />
                    <span style={{ textDecoration: 'none', fontSize:'14px', margin:'0', padding:'0' }} >LOGOUT</span> 
                    </LinkWrap>
                </TheLink>                
            </HeaderMenu>

        </HeaderWrap>
    )
}

export default Header;