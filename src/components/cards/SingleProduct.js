import React from 'react'
import { Card } from 'antd'
import { Link } from 'react-router-dom'
import { EyeOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import custom from '../../images/default.png'
import { PRODUCT } from '../../constants/routes'
import ProductListItems from './ProductListItems'

const { Meta } = Card

const SingleProduct = ({ product }) => {
  const { title, images, slug } = product

  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel
            showArrows={true}
            autoPlay
            infiniteLoop
          >
            {images.map(image => (
              <img key={image.public_id} src={image.url} alt={title} />
            ))}
          </Carousel>
        ) : (
          <Card
            cover={
              <img
                src={custom}
                alt={title}
                className="mb-3 card-image"
              />
            }
          />
        )}

      </div>



      <div className="col-md-5">
        <h1 className="bg-info p-3">
          {title}
        </h1>
        <Card
          actions={[
            <>
              <ShoppingCartOutlined  className="text-success" />
              <br/>
              Add to Cart
            </>,

            <Link to={`product/${slug}`}>
              <HeartOutlined  className="text-info" />
              <br/>
              Add to Wishlist
            </Link>
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  )
}

export default SingleProduct
