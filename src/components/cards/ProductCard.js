import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'

import { Card, Tooltip } from 'antd'
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import custom from '../../images/default.png'
import { PRODUCT } from '../../constants/routes'

import { showAverage } from '../../helpers/rating'

const { Meta } = Card


const ProductCard = ({ product }) => {
  const { title, description, images, slug, price } = product
  const [toolTip, setTooltip] = useState('Click to add')

  const { user, cart } = useSelector(state => ({...state}))
  const dispatch = useDispatch()

  const handleAddToCard = (e) => {

    let cart = []

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      cart.push({
        ...product,
        count: 1
      })

      let unique = _.uniqWith(cart, _.isEqual)
      localStorage.setItem('cart', JSON.stringify(unique))
      setTooltip('Added')

      dispatch({
        type: 'ADD_TO_CART',
        payload: unique
      })
    }
  }

  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? showAverage(product) : (
        <div className="text-center pt-1 pb-3">
          No rating yet
        </div>
      )}
      <Card
        hoverable
        cover={
          <img
            src={images.length ? images[0].url : custom}
            alt={title}
            style={{ height: 150, objectFit: 'cover' }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`${PRODUCT}/${slug}`}>
            <EyeOutlined />
            <br/>
            View Product
          </Link>,
          <Tooltip title={toolTip}>
            <div onClick={handleAddToCard}>
              <ShoppingCartOutlined className="text-primary"/>
              <br/>
              Add to Cart
            </div>
          </Tooltip>
        ]}
      >
        <Meta
          style={{ overflow: 'hidden' }}
          title={`${title} - $${price}`}
          description={description && `${description}...`}
        />
      </Card>
    </>
  )
}

export default ProductCard
