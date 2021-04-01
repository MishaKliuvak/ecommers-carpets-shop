import React from 'react'
import { Select, Input, Form } from 'antd'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import {DollarOutlined, FieldNumberOutlined} from "@ant-design/icons";
const { Option } = Select

const ProductForm = ({ handleSelect, handleDescription, handleSubmit, handleChange, values, handleCategoryChange, showSubs, subOptions, setValues }) => {
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

  const [form] = Form.useForm()

  return (
    <form onSubmit={handleSubmit} >
      <div className="form-group mb-4">
        <h6>Назва</h6>
        <Input
          placeholder="Назва"
          type="text"
          name="title"
          required
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group mb-4">
        <h6>Опис</h6>
        <ReactQuill required theme="snow" value={description} onChange={handleDescription} />
      </div>

      <div className="form-group mb-4">
        <h6>Вартість</h6>
        <Input
          placeholder="Вартість"
          type="number"
          required
          prefix={<DollarOutlined className="mr-1" />}
          name="price"
          value={price}
          onChange={handleChange}
        />
      </div>

      <div className="form-group mb-4">
        <h6>Наявність</h6>
        <Select
          placeholder="Наявність"
          style={{ width: '100%' }}
          name="shipping"
          onChange={(value) => handleSelect('shipping', value)}
        >
          <Option value="Yes">Yes</Option>
          <Option value="No">No</Option>
        </Select>
      </div>

      <div className="form-group mb-4">
        <h6>К-сть</h6>
        <Input
          required
          type="number"
          name="quantity"
          placeholder="К-сть"
          prefix={<FieldNumberOutlined className="mr-1" />}
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <div className="form-group mb-4">
        <h6>Колір</h6>
        <Select
          name="color"
          placeholder="Колір"
          required
          style={{ width: '100%' }}
          onChange={(value) => handleSelect('color', value)}
        >
          {colors.map(c => <Option value={c} key={c}>{c}</Option>)}
        </Select>
      </div>

      <div className="form-group mb-4">
        <h6>Бренд</h6>
        <Select
          name="brand"
          placeholder="Бренд"
          required
          style={{ width: '100%' }}
          onChange={(value) => handleSelect('brand', value)}
        >
          {brands.map(b => <Option value={b} key={b}>{b}</Option>)}
        </Select>
      </div>

      <div className="form-group mb-4">
        <h6>Категорія</h6>

        <Select
          name="category"
          placeholder="Категорія"
          required
          style={{ width: '100%' }}
          onChange={(value) => handleCategoryChange('category', value)}
        >
          {categories.length > 0 && categories.map((c) => (
            <Option key={c._id} value={c._id}>
              {c.name}
            </Option>
          ))}
        </Select>
      </div>

      {showSubs && (
        <div>
          <h6>Підкатегорії</h6>
          <Select
            className="mb-4"
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Обрати"
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

      <button className="btn btn-outline-info">Додати</button>
    </form>
  )
}

export default ProductForm
