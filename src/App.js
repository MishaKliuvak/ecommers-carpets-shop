import React, { useEffect, lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import * as ROUTES from './constants/routes'
import { auth } from './lib/firebase'
import { currentUser } from './helpers/auth'

import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import {LoadingOutlined} from "@ant-design/icons"

const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const Home = lazy(() => import('./pages/Home'))
const Header = lazy(() => import('./components/nav/Header'))
const RegisterComplete = lazy(() => import('./pages/auth/RegisterComplete'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))
const History = lazy(() => import('./pages/user/History'))
const UserRoute = lazy(() => import('./components/routes/UserRoute'))
const Password = lazy(() => import('./pages/user/Password'))
const WishList = lazy(() => import('./pages/user/WishList'))


const AdminRoute = lazy(() => import('./components/routes/AdminRoute'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const CreateCategory = lazy(() => import('./pages/admin/categories/CreateCategory'))
const UpdateCategory = lazy(() => import('./pages/admin/categories/UpdateCategory'))
const UpdateSub = lazy(() => import('./pages/admin/sub/UpdateSub'))
const CreateSub = lazy(() => import('./pages/admin/sub/CreateSub'))
const CreateProduct = lazy(() => import('./pages/admin/product/CreateProduct'))
const Products = lazy(() => import('./pages/admin/product/Products'))
const UpdateProduct = lazy(() => import('./pages/admin/product/UpdateProduct'))
const CreateCoupon = lazy(() => import('./pages/admin/coupon/CreateCoupon'))

const Product = lazy(() => import('./pages/Product'))
const CategoryHome = lazy(() => import('./pages/category/CategoryHome'))
const SubHome = lazy(() => import('./pages/sub/SubHome'))
const Shop = lazy(() => import('./pages/Shop'))
const Cart = lazy(() => import('./pages/Cart'))
const SideDrawer = lazy(() => import('./components/drawer/SideDrawer'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Payment = lazy(() => import('./pages/Payment'))

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
    <Suspense fallback={
        <div className="text-center text-danger"><LoadingOutlined /></div>
    }>
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
          <AdminRoute exact path={ROUTES.ADMIN_PRODUCT}>
            <CreateProduct />
          </AdminRoute>
          <AdminRoute exact path={ROUTES.ADMIN_PRODUCTS}>
            <Products />
          </AdminRoute>
          <AdminRoute exact path={`${ROUTES.ADMIN_SINGLE_PRODUCT}/:slug`}>
            <UpdateProduct />
          </AdminRoute>
          <AdminRoute exact path={ROUTES.ADMIN_COUPONS}>
            <CreateCoupon />
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
          <UserRoute exact path={ROUTES.PAYMENT}>
            <Payment />
          </UserRoute>
        </Switch>
    </Suspense>
  );
}

export default App;
