import React, { useEffect, useState } from 'react'
import { getProductsToHome } from '../../axios/product'

import ProductCard from '../cards/ProductCard'
import LoadingCard from '../cards/LoadingCard'

const NewArrivals = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAllProducts()
  }, [])

  const loadAllProducts = () => {
    setLoading(true)

    getProductsToHome('createdAt', 'desc',3)
      .then(res => {
        setLoading(false)
        setProducts(res.data)
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
      })
  }

  return (
    <>
      <div className="container">
        { loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map(product => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default NewArrivals
