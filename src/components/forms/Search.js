import React from 'react'
import { Input } from 'antd'

const { Search } = Input

const SearchForm = ({ keyword, setKeyword }) => {

  const handleSearchChange = (e) => {
    setKeyword(e.target.value.toLowerCase())
  }

  return (
      <Search
          placeholder="Назва категорії"
          allowClear
          enterButton="Пошук"
          size="large"
          value={keyword}
          onChange={handleSearchChange}
          className="mb-5 mt-3"
      />
  )
}

export default SearchForm
