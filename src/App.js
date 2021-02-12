import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useDispatch } from "react-redux"

import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Home from "./pages/Home"
import Header from "./components/nav/Header"
import RegisterComplete from "./pages/auth/RegisterComplete"
import ForgotPassword from "./pages/auth/ForgotPassword";

import { auth } from './lib/firebase'
import * as ROUTES from './constants/routes'


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
              const idTokenResult = await user.getIdTokenResult()

              dispatch ({
                  type: 'LOGGED_IN_USER',
                  payload: {
                      name: user.email,
                      token: idTokenResult.token
                  }
              })
          }
      })

      return () => unsubscribe()
  }, [])

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
            <Route exact path={ROUTES.FORGOT_PASSWORD}>
                <ForgotPassword />
            </Route>
    </>
  );
}

export default App;
