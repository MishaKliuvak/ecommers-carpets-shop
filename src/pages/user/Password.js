import React, { useState } from 'react'
import UserNav from '../../components/nav/UserNav'
import { auth } from '../../lib/firebase'
import { toast } from 'react-toastify'
import { Input } from 'antd'

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
        toast.success("Пароль було змінено")
      })
      .catch(err => {
        setLoading(false)
        toast.error(err.message)
      })
  }

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <h6>Новий пароль</h6>
        <Input
          type="password"
          onChange={e => setPassword(e.target.value)}
          className="form-control"
          placeholder="Пароль"
          value={password}
          disabled={loading}
        />
        <button className="btn btn-outline-primary mt-3" disabled={password.length < 6 || loading}>Змінити</button>
      </div>
    </form>
  )

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          <h4>{loading ? "Loading..." : "Зміна паролю"}</h4>
          <hr/>
            {passwordUpdateForm()}
        </div>
      </div>
    </div>
  )
}

export default Password
