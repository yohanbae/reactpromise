import React, { useState, useEffect} from "react";
import {Route, useHistory } from "react-router-dom";
import firebase from "./base";
import styled from "styled-components";

const LoadingBack = styled.div`
    color:white;
    width:100%;
    height:100vh;
    display:grid;
    justify-content:center;
    align-items:center;
`;

const Loading = styled.img`
    height:150px;
`;

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const [currentUser, setCurrentUser] = useState();
    let history = useHistory();

    useEffect(() => {
        let info = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // console.log(user.displayName);
                console.log(user.uid);
              setCurrentUser(user.email);
            } else {
              // No user is signed in.
              history.push("/login");
            }
        });

        return () => info();
    }, []);

    return (
        <Route
            {...rest}
            render={routeProps =>
            !!currentUser ? (
                <RouteComponent {...routeProps} />
            ) : (
                <LoadingBack>
                    <Loading src={require(`./assets/loading.gif`)} />
                </LoadingBack>
            )
            }
      />
    )   
}

export default PrivateRoute;