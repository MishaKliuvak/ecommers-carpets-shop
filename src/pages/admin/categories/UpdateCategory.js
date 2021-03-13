import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import AdminNav from '../../../components/nav/AdminNav'

import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getCategory, updateCategory } from '../../../axios/category'
import { ADMIN_CATEGORIES } from '../../../constants/routes'


const UpdateCategory = () => {
  const { user } = useSelector(state => ({...state}))

  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  let { slug } = useParams()
  let history = useHistory()

  useEffect(() => {
    loadCategory()
  }, [])

  const loadCategory = () =>
    getCategory(slug).then(c => setName(c.data.name))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    updateCategory(slug, { name }, user.token)
      .then(res => {
        setLoading(false)
        setName('')
        toast.success(`${res.data.name} is updated`)
        history.push(ADMIN_CATEGORIES)
      })
      .catch(err => {
        setLoading(false)

        err.response.status === 400
          ? toast.error(err.response.data)
          : toast.error(err.message)
      })
  }


  const showCategoryForm = () => (
    <form
      onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={ e => setName(e.target.value) }
          autoFocus
          required
          minLength={2}
        />
        <br/>
        <button className="btn btn-outline-primary">Change</button>
      </div>
    </form>
  )

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h4>{loading ? 'Loading...' : 'Update Category'}</h4>
          {showCategoryForm()}
        </div>
      </div>
    </div>
  )
}

export default UpdateCategory
