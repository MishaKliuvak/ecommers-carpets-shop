import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Card, Tooltip } from 'antd'
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import custom from '../../images/default.png'
import { PRODUCT } from '../../constants/routes'

import { showAverage } from '../../helpers/rating'
import { handleAddToCard } from '../../helpers/cart'
const { htmlToText } = require('html-to-text')

const { Meta } = Card


const ProductCard = ({ product }) => {
  const { title, description, images, slug, price, shipping } = product
  const [toolTip, setTooltip] = useState('Click to add')

  const dispatch = useDispatch()

  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? showAverage(product, true) : (
        <div className="text-center pt-1 pb-1">
          No rating yet
        </div>
      )}
      <Card
        className="mt-2"
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
            <button
              style={{ background: 'transparent', outline: 'none', border: 'none', cursor: 'pointer'}}
              onClick={() => handleAddToCard(product, dispatch, setTooltip)}
              disabled={product.quantity < 1}
            >
              <ShoppingCartOutlined className="text-primary"/>
              <br/>
              { product.quantity < 1 ? 'Not avaible' : 'Add to Cart' }
            </button>
          </Tooltip>
        ]}
      >
        <Meta
          style={{ overflow: 'hidden' }}
          title={title}
          description={description && <div>{htmlToText(description)}</div>}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="mt-4 mb-0 ">
          <div
              className="available"
              style={{
                background: shipping === 'Yes' ? '#f6ffed' : '#fff1f0',
                color: shipping === 'Yes' ? '#3f6600' : '#5c0011'
              }}
          >
            { shipping === 'Yes' ? 'В наявності' : 'Відсутній'}
          </div>
          <h4 className="text-right mb-0">{price} ₴</h4>
        </div>
      </Card>
    </>
  )
}

export default ProductCard
