import React, { useState, useEffect } from 'react'

import AdminNav from '../../../components/nav/AdminNav'
import ProductForm from '../../../components/forms/ProductForm'

import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { createProduct } from '../../../axios/product'
import FileUpload from '../../../components/forms/FileUpload'

import { getCategories, getCategorySubs } from '../../../axios/category'
import { LoadingOutlined } from '@ant-design/icons'

const initialState = {
  title: 'Macbook Pro',
  description: 'this is the best',
  price: '45000',
  categories: [],
  category: '',
  subs: [],
  shipping: 'Yes',
  quantity: '50',
  images: [

  ],
  colors: ['Black', 'White', 'Brown', 'Silver', 'Blue', 'Red'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Asus'],
  color: 'Black',
  brand: 'Apple'
}

const CreateProduct = () => {
  const [values, setValues] = useState(initialState)
  const [subOptions, setSubOptions] = useState([])
  const [showSubs, setShowSubs] = useState(false)
  const [loading, setLoading] = useState(false)

  const { user } = useSelector(state => ({...state}))

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = () =>
    getCategories().then(c => setValues({...values, categories: c.data}))

  const handleSubmit = (e) => {
    e.preventDefault()
    createProduct(values, user.token)
      .then((res) => {
        window.alert(`${res.data.title} is created`)
        window.location.reload()
      })
      .catch(err => {
        toast.error(err.response.data.err)
      })
  }

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const handleCategoryChange = e => {
    e.preventDefault()
    setValues({...values, subs: [], category: e.target.value})

    getCategorySubs(e.target.value)
      .then(res => {
        setSubOptions(res.data)
        setShowSubs(true)
      })
      .catch()
  }


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Create Product {loading && <LoadingOutlined className="text-danger h4" /> }</h4>
          <hr/>

          {JSON.stringify(values.images)}
          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSubs={showSubs}
          />
        </div>
      </div>
    </div>
  )
}

export default CreateProduct
