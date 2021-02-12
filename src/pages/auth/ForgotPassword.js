import React, { useState, useEffect } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useSelector } from "react-redux"
import { Button } from "antd";
import {auth} from "../../lib/firebase";
import {toast} from "react-toastify";

const ForgotPassword =  () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const {user} = useSelector(state => ({...state}))
    let history = useHistory()

    useEffect(() => {
        if (user && user.token) history.push('/')
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const config = {
            url: process.env.REACT_APP_FORGOT_REDIRECT_URL,
            handleCodeInApp: true
        }

        await auth.sendPasswordResetEmail(email, config)
                  .then(result => {
                      setEmail('')
                      setLoading(false)
                      toast.success('Check your email for password reset link')
                  })
                  .catch(error => {
                      setLoading(false)
                      toast.error(error.message)
                  })
    }

    return (
        <div className="container col-md-6 offset-md-3 p-5">
            {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Forgot
                Password</h4>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="form-control mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    autoFocus
                />
                <Button
                    type="primary"
                    disabled={!email}
                    block
                    shape="round"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default ForgotPassword
