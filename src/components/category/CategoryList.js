import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCategories } from '../../axios/category'
import { CATEGORY } from '../../constants/routes'

const CategoryList = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    getCategories()
      .then(res => {
        setLoading(false)
        setCategories(res.data)
      })
      .catch(err => {
        setLoading(false)
        console.error(err)
      })
  }, [])

  const showCategories = () => categories.length && categories.map(c =>
    <Link
      to={`${CATEGORY}/${c.slug}`}
      key={c._id}
      className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3">
      {c.name}
    </Link>
  )

  return (
    <div className="container">
      <div className="row">
        { loading ? (<h4 className="text-center">Loading ...</h4>) : showCategories() }
      </div>
    </div>
  )
}

export default CategoryList
