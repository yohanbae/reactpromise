import React from 'react';
import './App.css';
import Main from "./Main";
import EditTemplate from "./component/EditTemplate";
import Month from "./component/Month/Month";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './Home';
import SignUp from "./SignUp";
import Login from "./Login";
import {AuthProvider} from "./Auth";
import PrivateRoute from "./PrivateRoute";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Updating from "./component/Updating";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/main" component={Main} />
          <PrivateRoute path="/edit" component={EditTemplate} />
          <PrivateRoute path="/month" component={Month} />
          <PrivateRoute path="/updating" component={Updating} />          
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </Router>
      <ToastContainer transition={Slide} position={toast.POSITION.BOTTOM_LEFT} />
    </AuthProvider>
  );


}


export default App;
