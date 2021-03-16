import React, { useEffect, useState } from 'react'
import { getProducts } from '../axios/product'

import ProductCard from '../components/cards/ProductCard'
import LoadingCard from '../components/cards/LoadingCard'
import Jumbotron from '../components/cards/Jumbotron'
import { Skeleton } from 'antd'

const Home = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadAllProducts()
    }, [])

    const loadAllProducts = () => {
        setLoading(true)

        getProducts(3)
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
          <div className="jumbotron text-danger h1 font-weight-bold text-center">
              <Jumbotron text={['New arrivals', 'Best Sellers']} />
          </div>
        {/*<Skeleton active></Skeleton>*/}
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

export default Home
