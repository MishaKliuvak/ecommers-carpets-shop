import React, { useState } from 'react'
import UserNav from '../../components/nav/UserNav'
import { auth } from '../../lib/firebase'
import { toast } from 'react-toastify'

const Password = () => {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await auth.currentUser.updatePassword(password)
      .then(() => {
        setLoading(false)
        setPassword("")
        toast.success("Your password has been updated")
      })
      .catch(err => {
        setLoading(false)
        toast.error(err.message)
      })
  }

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Your password</label>
        <input
          type="password"
          onChange={e => setPassword(e.target.value)}
          className="form-control"
          placeholder="Enter new password"
          value={password}
          disabled={loading}
        />
        <button className="btn btn-primary" disabled={password.length < 6 || loading}>Submit</button>
      </div>
    </form>
  )

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          <h4>{loading ? "Loading..." : "Password Update"}</h4>
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  )
}

export default Password
