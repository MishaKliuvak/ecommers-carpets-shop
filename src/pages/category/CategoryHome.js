import React, { useState, useEffect} from 'react'
import { getCategory } from '../../axios/category'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../../components/cards/ProductCard'


const CategoryHome = () => {
  const [category, setCategory] = useState({})
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const { slug } = useParams()

  useEffect(() => {
    setLoading(true)

    getCategory(slug)
      .then(category => {
        setLoading(false)
        setCategory(category.data.category)
        setProducts(category.data.products)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
            { loading
              ? 'Loading...'
              : `${products.length} Products in "${category.name}" category`
            }
          </h4>
        </div>
      </div>

      <div className="row">
        {products.length
          ? (
            products.map(product => (
              <div className="col">
                <ProductCard product={product} />
              </div>
            ))
          ) : <div className="col text-center">Haven't products</div>}
      </div>
    </div>
  )
}

export default CategoryHome
