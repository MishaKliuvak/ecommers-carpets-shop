import React from 'react'
import { Select } from 'antd'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
const { Option } = Select

const ProductForm = ({ handleDescription, handleSubmit, handleChange, values, handleCategoryChange, showSubs, subOptions, setValues }) => {
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



  return (
    <form onSubmit={handleSubmit} >
      <div className="form-group">
        <h6>Title</h6>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <h6>Description</h6>
        {/*<input*/}
        {/*  type="text"*/}
        {/*  name="description"*/}
        {/*  className="form-control"*/}
        {/*  value={description}*/}
        {/*  onChange={handleChange}*/}
        {/*/>*/}
        <ReactQuill theme="snow" value={description} onChange={handleDescription} />
      </div>

      <div className="form-group">
        <h6>Price</h6>
        <input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <h6>Shipping</h6>
        <select
          name="shipping"
          className="form-control"
          onChange={handleChange}
        >
            <option value="" disabled selected>Select your option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div className="form-group">
        <h6>Quantity</h6>
        <input
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <h6>Color</h6>
        <select
          name="color"
          className="form-control"
          onChange={handleChange}
        >
            <option value="" disabled selected>Select your option</option>
          {colors.map(c => <option value={c} key={c}>{c}</option>)}
        </select>
      </div>

      <div className="form-group">
        <h6>Brand</h6>
        <select
          name="brand"
          className="form-control"
          onChange={handleChange}
        >
            <option value="" disabled selected>Select your option</option>
          {brands.map(b => <option value={b} key={b}>{b}</option>)}
        </select>
      </div>

      <div className="form-group">
        <h6>Category</h6>

        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
          placeholder="Please select"
        >
            <option value="" disabled selected>Select your option</option>
          {categories.length > 0 && categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {showSubs && (
        <div>
          <h6>Sub-Category</h6>
          <Select
            className="mb-4"
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            value={subs}
            onChange={ value => setValues({...values, subs: value}) }
          >
            {subOptions.length && subOptions.map((o) => (
              <Option key={o._id} value={o._id} >
                {o.name}
              </Option>
            ) )}
          </Select>
        </div>
      )}

      <button className="btn btn-outline-info">Add</button>
    </form>
  )
}

export default ProductForm
