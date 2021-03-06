import React, { useEffect, useState, createContext } from 'react'


import { getProduct, productStar, getRelatedProduct } from '../axios/product'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import SingleProduct from '../components/cards/SingleProduct'
import ProductCard from '../components/cards/ProductCard'
import {toast} from "react-toastify";

export const ModalContext = createContext()

const Product = () => {
  const [product, setProduct] = useState({})
  const [star, setStar] = useState(0)
  const [related, setRelated] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [comment, setComment] = useState('')

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

  const loadProduct = () => {
    getProduct(slug)
      .then(res => {
        setProduct(res.data)

        getRelatedProduct(res.data._id)
          .then(res => {
            setRelated(res.data)
          })
      })
      .catch(err => console.error(err))
  }

  const onStarClick = () => {
    //setStar(newRating)
     if (star === 0) {
         toast.error('Виберіть оцінку')
         return;
     }
    productStar(product._id, star, comment, user.token)
      .then((res) => {
        console.log(res.data)
        loadProduct()
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="container">
      <div className="row pt-4">
        <ModalContext.Provider value={{ modalVisible, setModalVisible }}>
          <SingleProduct
            product={product}
            onStarClick={onStarClick}
            star={star}
            setStar={setStar}
            comment={comment}
            setComment={setComment}
          />
        </ModalContext.Provider>
      </div>

      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr/>
          <h4>Схожі товари</h4>
          <hr/>
        </div>
      </div>
      <div className="row pb-5">
        {related.length ? related.map(item => (
          <div key={item._id} className="col-md-4">
            <ProductCard product={item} />
          </div>
        )) : <div className="text-center col">Не знайдено товарів</div> }
      </div>
    </div>
  )
}

export default Product
