import React from 'react'
import { Link } from 'react-router-dom'

import { Card } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import custom from '../../images/default.png'
import { ADMIN_SINGLE_PRODUCT } from '../../constants/routes'

const { Meta } = Card


const ProductCard = ({ product }) => {
  const { title, description, images, slug } = product


  return (
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
        <Link to={`${ADMIN_SINGLE_PRODUCT}/${slug}`}>
          <EyeOutlined />
          <br/>
          View Product
        </Link>,
        <>
          <ShoppingCartOutlined className="text-danger"/>
          <br/>
          Add to Cart
        </>
      ]}
    >
      <Meta
        style={{ overflow: 'hidden' }}
        title={title}
        description={description && `${description.substring(0, 40)}...`}
      />
    </Card>
  )
}

export default ProductCard
