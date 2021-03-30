import React, { useState, useEffect } from 'react'

import AdminNav from '../../../components/nav/AdminNav'
import CategoryForm from '../../../components/forms/CategoryForm'
import { useHistory, useParams } from 'react-router-dom'

import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getCategories } from '../../../axios/category'
import { getSub, updateSub } from '../../../axios/sub'
import { ADMIN_SUB } from '../../../constants/routes'
import {Select} from "antd";

const { Option } = Select

const UpdateSub = () => {
  const { user } = useSelector(state => ({...state}))

  let history = useHistory()
  let { slug } = useParams()

  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])

  const [parent, setParent] = useState('')

  useEffect(() => {
    loadCategories()
    loadSub()
  }, [])

  const loadCategories = () =>
    getCategories().then(c => setCategories(c.data))

  const loadSub = () => getSub(slug).then(s => {
    console.log(s.data)
      setName(s.data.sub.name)
      setParent(s.data.sub.parent)
    })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    updateSub(slug,{ name, parent }, user.token)
      .then(res => {
        setLoading(false)
        setName('')
        toast.success(`${res.data.name} is changed`)
        history.push(ADMIN_SUB)
      })
      .catch(err => {
        setLoading(false)

        err.response.status === 400
          ? toast.error(err.response.data)
          : toast.error(err.message)
      })
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h4>{loading ? 'Loading...' : 'Update Sub-Category'}</h4>
          <hr/>
          <div className="form-group">
            <h6>Parent category</h6>
            <Select
                name="category"
                placeholder="Category"
                value={parent}
                style={{ width: '100%' }}
                onChange={(value) => setParent(value)}
            >
              {categories.length > 0 && categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
              ))}
            </Select>
          </div>

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            text="Change"
          />
        </div>
      </div>
    </div>
  )
}

export default UpdateSub
