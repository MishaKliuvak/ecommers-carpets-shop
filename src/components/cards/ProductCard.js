import React from 'react'
import { Link } from 'react-router-dom'

import _ from 'lodash'

import { Card } from 'antd'
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import custom from '../../images/default.png'
import { PRODUCT } from '../../constants/routes'

import { showAverage } from '../../helpers/rating'

const { Meta } = Card


const ProductCard = ({ product }) => {
  const { title, description, images, slug, price } = product

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
          <div onClick={handleAddToCard}>
            <ShoppingCartOutlined className="text-primary"/>
            <br/>
            Add to Cart
          </div>
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
