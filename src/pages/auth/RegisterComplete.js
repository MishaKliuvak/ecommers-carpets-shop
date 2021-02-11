import React, { useState, useEffect } from 'react'
import { auth } from "../../lib/firebase"
import { toast } from "react-toastify"
import { HOME } from '../../constants/routes'

const RegisterComplete = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validation
        if (!email || !password) {
            toast.error('Email and Password is required')
            return
        } else if (password.length < 6) {
            toast.error('Password must be at least 5 characters')
            return
        }

        try {
           const result = await auth.signInWithEmailLink(email, window.location.href)
            if (result.user.emailVerified) {
                // Remove user email from local storage
                window.localStorage.removeItem('emailForRegistration')

                // Get user id token
                let user = auth.currentUser
                await user.updatePassword(password)
                const idTokenResult = await user.getIdTokenResult()

                // Redux store

                // Redirect
                history.push(HOME)
            }
        }  catch (error) {
            toast.error(error.message)
        }

    }

    const completeRegistrationForm = () => <form onSubmit={handleSubmit}>
        <input
            type="email"
            className="form-control"
            value={email}
            disabled />
        <input
            type="password"
            className="form-control"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} />
        <button
            type="submit"
            className="btn btn-raised">
            Register
        </button>
    </form>

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Complete Registration</h4>
                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    )
}

export default RegisterComplete
