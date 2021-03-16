import React from 'react'

const CategoryForm = ({ name, setName, handleSubmit, text }) => {
  return (
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
        <button className="btn btn-outline-primary">{text}</button>
      </div>
    </form>
  )
}

export default CategoryForm
