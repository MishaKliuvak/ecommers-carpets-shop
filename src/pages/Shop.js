import React, { useState, useEffect} from 'react'
import { getProducts } from '../axios/product'
import { useSelector, useDispatch } from 'react-redux'
import ProductCard from '../components/cards/ProductCard'

const Shop = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAllProducts()
  }, [])

  const loadAllProducts = () => {
    getProducts(12)
      .then(res => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch(err => console.error(err))
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          search filter menu
        </div>

        <div className="col-md-9">
          <h4>{ loading ? 'Loading...' : 'Products' }</h4>
          {products.length < 1 && <p>Products not found</p>}

          <div className="row pb-5">
            {products.map(product => (
              <div key={product._id} className="col-md-4 mt-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
