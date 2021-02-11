import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch } from "react-redux"

import { Button } from "antd"
import { MailOutlined, GoogleOutlined } from '@ant-design/icons'
import {auth, googleAuthProvider} from "../../lib/firebase";
import { HOME, FORGOT_PASSWORD } from "../../constants/routes";
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    let history = useHistory()
    let dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { user } = await auth.signInWithEmailAndPassword(email, password)
            const idTokenResult = await user.getIdTokenResult()

            dispatch({
                type: 'LOGGED_IN_USER',
                payload: {
                    name: user.email,
                    token: idTokenResult.token
                }
            })

            history.push(HOME)
        } catch (error) {
            setLoading(false)
            toast.error(error.message)
        }
    }

    const googleLogin = async () => {
        auth.signInWithPopup(googleAuthProvider)
            .then(async ({ user }) => {
               const idTokenResult = await user.getIdTokenResult()
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                        name: user.email,
                        token: idTokenResult.token
                    }
                })
                history.push(HOME)
            })
            .catch(error => {
                console.log(error => toast.error(error.message));
            })
    }

    const loginForm = () => <form onSubmit={handleSubmit}>
        <input
            type="email"
            className="form-control mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoFocus
        />
        <input
            type="password"
            className="form-control mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
        <Button
            onClick={handleSubmit}
            type="primary"
            className="mb-3"
            block
            shape="round"
            icon={<MailOutlined />}
            size="large"
            disabled={!email || password.length < 6}
        >
            Login with Email/Password
        </Button>
        <Button
            onClick={googleLogin}
            type="danger"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
        >
            Login with Google
        </Button>
        <Link to={FORGOT_PASSWORD} className="float-right text-danger">Forgot Password</Link>
    </form>

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {!loading ? <h4>Login</h4> : <h4 className="text-danger">Loading...</h4>}
                    {loginForm()}
                </div>
            </div>
        </div>
    )
}

export default Login
