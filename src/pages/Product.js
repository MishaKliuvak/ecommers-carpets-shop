import React, { useEffect, useState } from 'react'


import { getProduct } from '../axios/product'
import { useParams } from 'react-router-dom'

import SingleProduct from '../components/cards/SingleProduct'

const Product = () => {
  const [product, setProduct] = useState({})
  const { slug } = useParams()

  useEffect(() => {
    loadProduct()
  }, [slug])

  const loadProduct = () =>
    getProduct(slug)
      .then(res => {
        setProduct(res.data)
      })
      .catch(err => console.error(err))

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct product={product} />
      </div>

      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr/>
          <h4>Related products</h4>
          <hr/>
        </div>
      </div>
    </div>
  )
}

export default Product
