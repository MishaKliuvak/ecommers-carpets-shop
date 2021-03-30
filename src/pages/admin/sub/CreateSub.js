import React, { useState, useEffect } from 'react'

import AdminNav from '../../../components/nav/AdminNav'
import CategoryForm from '../../../components/forms/CategoryForm'

import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getCategories } from '../../../axios/category'
import { getSubs, removeSub, createSub } from '../../../axios/sub'
import { Link } from 'react-router-dom'
import { ADMIN_UPDATE_SUB } from '../../../constants/routes'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Search from '../../../components/forms/Search'
import {Select} from "antd";
const { Option } = Select


const CreateSub = () => {
  const { user } = useSelector(state => ({...state}))

  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')

  const [subs, setSubs] = useState([])

  const [keyword, setKeyword] = useState('')


  useEffect(() => {
    loadCategories()
    loadSubs()
  }, [])

  const loadCategories = () =>
    getCategories().then(c => setCategories(c.data))

  const loadSubs = () =>
    getSubs().then(s => setSubs(s.data))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (category === '') {
      toast.error('Заповніть поля')
      return
    }
    setLoading(true)

    createSub({ name, parent: category }, user.token)
      .then(res => {
        setLoading(false)
        setName('')
        toast.success(`${res.data.name} is created`)
        loadSubs()
      })
      .catch(err => {
        setLoading(false)

        err.response.status === 400
          ? toast.error(err.response.data)
          : toast.error(err.message)
      })
  }

  const handleRemove = async (slug) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setLoading(true)
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false)
          toast.error(`${res.data.name} was deleted`)
          loadSubs()
        })
        .catch(err => {
          setLoading(false)

          err.response.status === 400
            ? toast.error(err.response.data)
            : toast.error(err.message)
        })
    }
  }



  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h4>{loading ? 'Loading...' : 'Create Sub-Category'}</h4>
          <hr/>
          <div className="form-group">
            <h6>Parent category</h6>
            <Select
                name="category"
                placeholder="Category"
                style={{ width: '100%' }}
                onChange={(value) => setCategory(value)}
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
            text="Add"
          />

          <Search keyword={keyword} setKeyword={setKeyword}/>

          {subs.filter(searched(keyword)).map((s) => (
            <div
              key={s._id}
              className="alert alert-secondary alert-custom"
            >
              {s.name}
              <span
                className="btn btn-sm float-right"
                onClick={() => handleRemove(s.slug)}
              >
                <DeleteOutlined className="text-danger"/>
              </span>
              <Link
                to={`${ADMIN_UPDATE_SUB}/${s.slug}`}
              >
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-primary"/>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CreateSub
