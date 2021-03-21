import React, { useState } from 'react'
import { Card, Tabs, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { EyeOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import custom from '../../images/default.png'
import { PRODUCT } from '../../constants/routes'
import ProductListItems from './ProductListItems'
import StarRatings from 'react-star-ratings';
import RatingModal from '../modal/RatingModal'
import { handleAddToCard } from '../../helpers/cart'
import { showAverage } from '../../helpers/rating'
import { useDispatch } from 'react-redux'

const { TabPane } = Tabs

const SingleProduct = ({ product, onStarClick, star, setStar }) => {
  const { title, images, slug, description, _id } = product
  const [toolTip, setTooltip] = useState('Click to add')

  const dispatch = useDispatch()

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

        {product && product.ratings && product.ratings.length > 0 ? showAverage(product) : (
            <div className="text-center pt-1 pb-3">
              No rating yet
            </div>
        )}

        <Card
          actions={[
            <Tooltip title={toolTip}>
              <div onClick={() => handleAddToCard(product, dispatch, setTooltip)}>
                <ShoppingCartOutlined className="text-primary"/>
                <br/>
                Add to Cart
              </div>
            </Tooltip>,

            <Link to={`product/${slug}`}>
              <HeartOutlined  className="text-info" />
              <br/>
              Add to Wishlist
            </Link>,

            <RatingModal onStarClick={onStarClick} >
              <StarRatings
                name={_id}
                numberOfStars={5}
                isSelectable
                starRatedColor="red"
                rating={star}
                changeRating={(newValue, name) => setStar(newValue)}
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
