import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'

import { Menu } from 'antd'
import { HomeOutlined, SettingOutlined, UserOutlined, UserAddOutlined } from '@ant-design/icons'

const { SubMenu, Item } = Menu

const Header = () => {
    const [current, setCurrent] = useState('home')

    const handleClick = e => {
        setCurrent(e.key);
    };

    return (
        <Menu onClick={handleClick} selectedKeys={current} mode="horizontal">
            <Item key="home" icon={<HomeOutlined />}>
                <Link to={ROUTES.HOME}>Home</Link>
            </Item>

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

            <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Account">
                <Item key="setting:1">Option 1</Item>
                <Item key="setting:2">Option 2</Item>
            </SubMenu>
        </Menu>
    )
}

export default Header
