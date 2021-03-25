import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'

const { Search } = Input

const ProductSearch = () => {
  const dispatch = useDispatch()
  let history = useHistory()

  const { search } = useSelector(state => ({...state}))
  const { text } = search

  const handleChange = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: e.target.value }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    history.push(`/shop?${text}`)
  }

  return (
    <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
      <Search
        style={{ width: 200 }}
        className="mt-1 mb-1"
        type="search"
        value={text}
        onChange={handleChange}
        placeholder="Search"
      />
    </form>
  )
}

export default ProductSearch
