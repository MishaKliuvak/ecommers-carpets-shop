import React, { useState, useEffect } from 'react'

import AdminNav from '../../../components/nav/AdminNav'
import CategoryForm from '../../../components/forms/CategoryForm'

import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getCategories, removeCategory, createCategory } from '../../../axios/category'
import { Link } from 'react-router-dom'
import { ADMIN_UPDATE_CATEGORY } from '../../../constants/routes'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import SearchForm from '../../../components/forms/Search'


const CreateCategory = () => {
  const { user } = useSelector(state => ({...state}))

  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])

  const [keyword, setKeyword] = useState('')


  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = () =>
    getCategories().then(c => setCategories(c.data))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    createCategory({ name }, user.token)
      .then(res => {
        setLoading(false)
        setName('')
        toast.success(`${res.data.name} is created`)
        loadCategories()
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
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false)
          toast.error(`${res.data.name} was deleted`)
          loadCategories()
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
          <h4>{loading ? 'Loading...' : 'Create Category'}</h4>
          <hr/>
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            text="Add"
          />

          <SearchForm keyword={keyword} setKeyword={setKeyword}/>

          {categories.filter(searched(keyword)).map((c) => (
            <div
              key={c._id}
              className="alert alert-secondary alert-custom"
            >
              {c.name}
              <span
                className="btn btn-sm float-right"
                onClick={() => handleRemove(c.slug)}
              >
                <DeleteOutlined className="text-danger"/>
              </span>
              <Link
                to={`${ADMIN_UPDATE_CATEGORY}/${c.slug}`}
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

export default CreateCategory
