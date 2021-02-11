import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";


import * as ROUTES from './constants/routes'


function App() {
  return (
    <>
        <Header />
        <ToastContainer />
            <Route exact path={ROUTES.HOME}>
                <Home />
            </Route>
            <Route exact path={ROUTES.LOGIN}>
                <Login />
            </Route>
            <Route exact path={ROUTES.REGISTER}>
                <Register />
            </Route>
            <Route exact path={ROUTES.REGISTER_COMPLETE}>
                <RegisterComplete />
            </Route>
    </>
  );
}

export default App;
