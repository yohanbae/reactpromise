import React, {useCallback, useContext} from 'react';
import './App.css';
import {withRouter, Redirect} from "react-router";
import {AuthContext} from "./Auth";
import firebase from "./base";
import styled from "styled-components";
import finger from "./assets/finger-icon.png";
import { toast} from "react-toastify";
import thelogo from "./assets/finger-icon.png";

const LoginWrap = styled.div`
    display:grid;
    align-items:center;
    justify-content:center;
    height:100vh;
`;

const Mobile = styled.div`
    @media only screen and (min-width: 769px) {
        display:none;
    }
    @media only screen and (max-width: 768px) {
        background: white;
        width:100%;
        height:100%;
        z-index:9999;
        position:fixed;
        left: 0; top:0;
        display:grid;
        justify-content:center;
        align-items:center;
    }
`;

const MobileComp = styled.div`
  text-align:center;
`;


const CenterWrap = styled.div`
    width:250px;
    padding:20px;
    border:1px solid lightgray;
    text-align:center;
`;

const FormInput = styled.input`
    width:calc(100% - 15px);
    padding-left:5px;
    padding-top:5px;
    padding-bottom:5px;
    margin:0;
    margin-bottom:10px;
    font-size:12px;
`;

const H1 = styled.h1`
    font-size:40px;
    font-weight:300;
    padding:0;
    margin:20px 0;
`
const H4 = styled.h4`
    font-weight:300;
    font-size:14px;
    margin-bottom:20px;
`;

const LoginButton = styled.button`
    width:calc(100% - 5px);    
    border:none;
    margin: 10px 0;
    padding:5px;
    color:white;
    background:rgba(52, 64, 108, 0.5);
    cursor:pointer;
`;

const Button = styled.button`
    width:100%;    
    border:none;
    padding:5px;
    color:rgba(52, 64, 108, 1);
    background:none;
    cursor:pointer;
`;

const Login = ({ history }) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const {email, password} = event.target.elements;
            try{
                await firebase
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/main");
            } catch (error) {
                toast.error(`Please enter information correctly: ${error}`, {hideProgressBar: true});
            }
        }, [history]
    );

    const {currentUser} = useContext(AuthContext);

    return (
        <LoginWrap>
            <Mobile>
              <MobileComp>
                <img src={thelogo} width={100} height={100} />
                <p>PROMISE</p>
                <p>PLEASE DOWNLOAD MOBILE APP</p>
              </MobileComp>
            </Mobile>            
            <CenterWrap>
            {
            currentUser ? <Redirect to="/main" /> : (
                <div>
                <img src={finger} width="100" />
                <H1>PROMISE</H1>
                <H4>Manage your Regular tasks to have better life. We help you to build your hobbits.</H4>
                <form onSubmit={handleLogin}>
                      <FormInput name="email" type="email" placeholder="Email" />
                      <FormInput name="password" type="password" placeholder="Password" />
                  <LoginButton type="submit">Login</LoginButton> 
                </form>
                    <H4>Don't have an account?</H4>
                    <Button onClick={() => history.push("/signup")}> Sign Up </Button>

                </div>
            )
            }                
            </CenterWrap>
        </LoginWrap>
            


    );
}

export default withRouter(Login);