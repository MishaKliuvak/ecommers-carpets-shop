import React from 'react'
import {Input} from "antd";
import {DollarOutlined} from "@ant-design/icons";

const CategoryForm = ({ name, setName, handleSubmit, text }) => {

  return (
    <form
      onSubmit={handleSubmit}>
      <div className="form-group">
          <h6>Назва</h6>
          <Input
              placeholder="Назва"
              autoFocus
              type="text"
              required
              className="mb-3"
              value={name}
              onChange={e => setName(e.target.value)}
          />
        <br/>
        <button className="btn btn-outline-primary">{text}</button>
      </div>
    </form>
  )
}

export default CategoryForm
