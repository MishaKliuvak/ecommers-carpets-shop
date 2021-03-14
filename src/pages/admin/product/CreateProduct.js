import React, { useState, useEffect } from 'react'

import AdminNav from '../../../components/nav/AdminNav'
import CategoryForm from '../../../components/forms/CategoryForm'

import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { createProduct } from '../../../axios/product'

const initialState = {
  title: 'Macbook Pro',
  description: 'this is the best',
  price: '45000',
  categories: [],
  category: '',
  subs: [],
  shipping: 'Yes',
  quantity: '50',
  images: [],
  colors: ['Black', 'White', 'Brown', 'Silver', 'Blue', 'Red'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Asus'],
  color: 'Black',
  brand: 'Apple'
}

const CreateProduct = () => {
  const [values, setValues] = useState(initialState)
  const { user } = useSelector(state => ({...state}))
  // destructure
  const {
    title,
    description,
    categories,
    price,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand
  } = values

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


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Create Product</h4>
          <hr/>

          <form onSubmit={handleSubmit} >
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Shipping</label>
              <select
                name="shipping"
                className="form-control"
                onChange={handleChange}
              >
                <option>Please select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                value={quantity}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Color</label>
              <select
                name="color"
                className="form-control"
                onChange={handleChange}
              >
                <option>Please select</option>
                {colors.map(c => <option value={c} key={c}>{c}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Brand</label>
              <select
                name="brand"
                className="form-control"
                onChange={handleChange}
              >
                <option>Please select</option>
                {brands.map(b => <option value={b} key={b}>{b}</option>)}
              </select>
            </div>

            <button className="btn btn-outline-info">Add</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct
