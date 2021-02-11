import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./components/nav/Header";

import * as ROUTES from './constants/routes'


function App() {
  return (
    <>
        <Header />
            <Route exact path={ROUTES.HOME}>
                <Home />
            </Route>
            <Route exact path={ROUTES.LOGIN}>
                <Login />
            </Route>
            <Route exact path={ROUTES.REGISTER}>
                <Register />
            </Route>
    </>
  );
}

export default App;
