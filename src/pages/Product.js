import React, { useEffect, useState, createContext } from 'react'


import { getProduct, productStar } from '../axios/product'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import SingleProduct from '../components/cards/SingleProduct'

export const ModalContext = createContext()

const Product = () => {
  const [product, setProduct] = useState({})
  const [star, setStar] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)


  const { slug } = useParams()
  const { user } = useSelector(state => ({...state}))

  useEffect(() => {
    loadProduct()
  }, [slug])

  useEffect(() => {
    if (product.ratings && user && !modalVisible) {
      let existingRatingObj = product.ratings.find((item) => item.postedBy.toString() === user._id.toString())
      existingRatingObj && setStar(existingRatingObj.star)
    }
  })

  const loadProduct = () =>
    getProduct(slug)
      .then(res => {
        setProduct(res.data)
      })
      .catch(err => console.error(err))

  const onStarClick = () => {
    //setStar(newRating)

    productStar(product._id, star, user.token)
      .then((res) => {
        console.log(res.data)
        loadProduct()
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <ModalContext.Provider value={{ modalVisible, setModalVisible }}>
          <SingleProduct
            product={product}
            onStarClick={onStarClick}
            star={star}
            setStar={setStar}
          />
        </ModalContext.Provider>
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
