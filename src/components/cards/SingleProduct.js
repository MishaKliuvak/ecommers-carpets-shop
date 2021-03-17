import React from 'react'
import { Card, Tabs } from 'antd'
import { Link } from 'react-router-dom'
import { EyeOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import custom from '../../images/default.png'
import { PRODUCT } from '../../constants/routes'
import ProductListItems from './ProductListItems'
import StarRatings from 'react-star-ratings';
import RatingModal from '../modal/RatingModal'

const { TabPane } = Tabs

const SingleProduct = ({ product }) => {
  const { title, images, slug, description, _id } = product

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

        <Tabs
          type="card"
        >
          <TabPane
            tab="Description"
            key={1}
          >
            {description && description}
          </TabPane>

          <TabPane
            tab="More"
            key={2}
          >
            Call use on xxxx xxxx xxxx xxxx
          </TabPane>
        </Tabs>
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
            </Link>,

            <RatingModal>
              <StarRatings
                name={_id}
                numberOfStars={5}
                isSelectable
                starRatedColor="red"
                rating={2}
                changeRating={ (newRating, name) => console.log(newRating, name) }
              />
            </RatingModal>
          ]}
        >
          <ProductListItems product={product} />
        </Card>

      </div>
    </>
  )
}

export default SingleProduct
