import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom'

import firebase from "firebase";

import * as ROUTES from '../../constants/routes'

import { Menu, Badge } from 'antd'
import { HomeOutlined, SettingOutlined, UserOutlined, UserAddOutlined, ShoppingOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import ProductSearch from '../forms/ProductSearch'

const { SubMenu, Item } = Menu

const Header = () => {
    const [current, setCurrent] = useState('home')

    let history = useHistory()
    let dispatch = useDispatch()
    let { user, cart } = useSelector((state) => ({...state}))

    const handleClick = e => {
        setCurrent(e.key);
    };

    const logOut = () => {
        firebase.auth().signOut()
        dispatch({
            type: 'LOGOUT',
            payload: null
        })
        history.push(ROUTES.LOGIN)
    }

    return (
        <Menu onClick={handleClick} selectedKeys={current} mode="horizontal">
            <Item key="home" icon={<HomeOutlined />}>
                <Link to={ROUTES.HOME}>Home</Link>
            </Item>
            <Item key="shop" icon={<ShoppingOutlined />}>
                <Link to={ROUTES.SHOP}>Shop</Link>
            </Item>
          <Item key="cart" icon={<ShoppingCartOutlined />}>
            <Link to={ROUTES.SHOP}>
              <Badge count={cart.length} offset={[9,0]}>
                Cart
              </Badge>
            </Link>
          </Item>

            {!user ? (
                <>
                    <Item
                        key="register"
                        icon={<UserAddOutlined />}
                        className="float-right"
                    >
                        <Link to={ROUTES.REGISTER}>Register</Link>
                    </Item>

                    <Item
                        key="login"
                        icon={<UserOutlined />}
                        className="float-right"
                    >
                        <Link to={ROUTES.LOGIN}>Login</Link>
                    </Item>
                </>
                ) : (
                    <SubMenu
                        key="SubMenu"
                        icon={<SettingOutlined />}
                        title={user.name.split('@')[0]}
                        className="float-right"
                    >
                        { user && user.role === 'subscriber' &&  (
                          <Item key="setting:1">
                            <Link to={ROUTES.USER_HISTORY}>Dashboard</Link>
                          </Item>
                        )}
                        { user && user.role === 'admin' &&  (
                          <Item key="setting:1">
                              <Link to={ROUTES.ADMIN_DASHBOARD}>Dashboard</Link>
                          </Item>
                        )}
                        <Item icon={<UserOutlined />} onClick={logOut}>Log out</Item>
                    </SubMenu>
                )}
            <span className="float-right p-1">
                <ProductSearch />
            </span>
        </Menu>
    )
}

export default Header
