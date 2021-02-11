import React, { useState } from 'react'
import { auth } from "../../lib/firebase"
import { toast } from "react-toastify"
const Register = () => {
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        // Send submit link on email
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true
        }

        auth.sendSignInLinkToEmail(email, config)
                  .then(() => {
                      toast.success(`Email is sent to ${email}. Click the link to complete your registration`)
                      // Save user email in local storage
                      window.localStorage.setItem('emailForRegistration', email)
                      // Clear state
                      setEmail('')
                  })
                  .catch(error => {
                      toast.error(error.message)
                  })
    }

    const registerForm = () => <form onSubmit={handleSubmit}>
        <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus />
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
                    <h4>Register</h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    )
}

export default Register
