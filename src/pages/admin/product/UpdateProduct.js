import React, { useState, useEffect } from 'react'

import AdminNav from '../../../components/nav/AdminNav'
import { useSelector } from 'react-redux'

import { useParams, useHistory } from 'react-router-dom'
import { getProduct, updateProduct } from '../../../axios/product'
import FileUpload from '../../../components/forms/FileUpload'
import  ProductUpdate  from '../../../components/forms/ProductUpdate'

import { getCategories, getCategorySubs } from '../../../axios/category'
import { LoadingOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import { ADMIN_PRODUCTS } from '../../../constants/routes'
const initialState = {
  title: '',
  description: '',
  price: '',
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ['Black', 'White', 'Brown', 'Silver', 'Blue', 'Red'],
  brands: ['IKEA', 'Karat', 'AW', 'ITC', 'Ideal', 'Kartal', 'Looshchoow', 'Penny', 'Sanat', 'Киевгума', 'Лущув'],
  color: '',
  brand: ''
}

const UpdateProduct = (props) => {
  const { user } = useSelector(state => ({...state}))

  let history = useHistory()

  const [subOptions, setSubOptions] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [showSubs, setShowSubs] = useState(false)
  const [arrayOfSubIds, setArrayOfSubIds] = useState([])
  const [values, setValues] = useState(initialState)
  const [loading, setLoading] = useState(false)

  const { slug } = useParams()

  useEffect(() => {
    loadProduct()
    loadCategories()
  }, [])

  const loadProduct = () => {
    getProduct(slug)
      .then((product) =>{
        // Single product
        setValues({ ...values, ...product.data })
        // Category subs
        getCategorySubs(product.data.category._id)
          .then((subs) => setSubOptions(subs.data))
          .catch((err) => console.error(err))

        // Array of ids to show
        let arr = []
        product.data.subs.map((sub) => {
          arr.push(sub._id)
        })

        setArrayOfSubIds(arr)

      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    values.subs = arrayOfSubIds
    values.category = selectedCategory ? selectedCategory : values.category

    updateProduct(slug, values, user.token)
      .then(res => {
        setLoading(false)
        toast.success(`${res.data.title} was updated`)
        history.push(ADMIN_PRODUCTS)
      })
      .catch (err => {
        setLoading(false)
        toast.error(err.response.data.err)
      })
  }

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
    console.log(e);
  }

  const loadCategories = () =>
    getCategories().then(c => {
      setCategories(c.data)
    })

  const handleSelect = (name, value) => {
    setValues({...values, [name]: value})
  }

  const handleCategoryChange = (value) => {
    setSelectedCategory(value)
    setValues({...values, subs: []})

    getCategorySubs(value)
        .then(res => {
          setSubOptions(res.data)
          setShowSubs(true)
        })
        .catch()

    if (values.category._id === value) {
      loadProduct()
    }
    setArrayOfSubIds([])
  }


  const handleDescription = (description) => {
    if (values.quantity !== '')
      setValues({...values, ['description']: description.toString() })
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Update Product {loading && <LoadingOutlined className="text-danger h4" /> }</h4>

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>
          <ProductUpdate
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            categories={categories}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            handleSelect={handleSelect}
            showSubs={showSubs}
            arrayOfSubIds={arrayOfSubIds}
            setArrayOfSubIds={setArrayOfSubIds}
            selectedCategory={selectedCategory}
            handleDescription={handleDescription}
          />
          <hr/>
        </div>
      </div>
    </div>
  )
}

export default UpdateProduct
