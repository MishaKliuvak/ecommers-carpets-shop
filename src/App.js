import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Home from "./pages/Home"
import Header from "./components/nav/Header"
import RegisterComplete from "./pages/auth/RegisterComplete"
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History"
import UserRoute from "./components/routes/UserRoute"
import Password from "./pages/user/Password"
import WishList from "./pages/user/WishList"

import { auth } from './lib/firebase'
import * as ROUTES from './constants/routes'
import { currentUser } from './helpers/auth'
import AdminRoute from './components/routes/AdminRoute'
import AdminDashboard from './pages/admin/AdminDashboard'
import CreateCategory from "./pages/admin/categories/CreateCategory"
import UpdateCategory from "./pages/admin/categories/UpdateCategory"
import UpdateSub from "./pages/admin/sub/UpdateSub"
import CreateSub from "./pages/admin/sub/CreateSub"
import { ADMIN_PRODUCT, ADMIN_PRODUCTS, ADMIN_SINGLE_PRODUCT } from './constants/routes'
import CreateProduct from './pages/admin/product/CreateProduct'
import Products from './pages/admin/product/Products'
import UpdateProduct from './pages/admin/product/UpdateProduct'

import Product from './pages/Product'
import CategoryHome from './pages/category/CategoryHome'
import SubHome from './pages/sub/SubHome'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import SideDrawer from './components/drawer/SideDrawer'
import Checkout from './pages/Checkout'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
              const idTokenResult = await user.getIdTokenResult()

            currentUser(idTokenResult.token)
              .then(res => {
                dispatch({
                  type: 'LOGGED_IN_USER',
                  payload: {
                    name: res.data.name,
                    email: res.data.email,
                    token: idTokenResult.token,
                    role: res.data.role,
                    _id: res.data._id
                  }
                })
              })
              .catch(err => console.error(err))
          }
      })

      return () => unsubscribe()
  }, [])

  return (
    <>
        <Header />
        <SideDrawer />
        <ToastContainer />
        <Switch>
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
            <UserRoute exact path={ROUTES.USER_HISTORY}>
              <History />
            </UserRoute>
          <UserRoute exact path={ROUTES.USER_PASSWORD}>
            <Password />
          </UserRoute>
          <UserRoute exact path={ROUTES.USER_WISHLIST}>
            <WishList />
          </UserRoute>
          <AdminRoute exact path={ROUTES.ADMIN_DASHBOARD}>
            <AdminDashboard />
          </AdminRoute>
          <AdminRoute exact path={ROUTES.ADMIN_CATEGORIES}>
            <CreateCategory />
          </AdminRoute>
          <AdminRoute exact path={`${ROUTES.ADMIN_UPDATE_CATEGORY}/:slug`}>
            <UpdateCategory />
          </AdminRoute>
          <AdminRoute exact path={ROUTES.ADMIN_SUB}>
            <CreateSub />
          </AdminRoute>
          <AdminRoute exact path={`${ROUTES.ADMIN_UPDATE_SUB}/:slug`}>
            <UpdateSub />
          </AdminRoute>
          <AdminRoute exact path={ADMIN_PRODUCT}>
            <CreateProduct />
          </AdminRoute>
          <AdminRoute exact path={ADMIN_PRODUCTS}>
            <Products />
          </AdminRoute>
          <AdminRoute exact path={`${ADMIN_SINGLE_PRODUCT}/:slug`}>
            <UpdateProduct />
          </AdminRoute>
          <Route exact path={`${ROUTES.PRODUCT}/:slug`}>
            <Product />
          </Route>
          <Route exact path={`${ROUTES.CATEGORY}/:slug`}>
            <CategoryHome />
          </Route>
          <Route exact path={`${ROUTES.SUB}/:slug`}>
            <SubHome />
          </Route>
          <Route exact path={ROUTES.SHOP}>
            <Shop />
          </Route>
          <Route exact path={ROUTES.CART}>
            <Cart />
          </Route>
          <Route exact path={ROUTES.CHECKOUT}>
            <Checkout />
          </Route>
        </Switch>
    </>
  );
}

export default App;
