import React, { useState } from 'react'
import { Card, Comment, Tabs, Tooltip } from 'antd'
import { EyeOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import custom from '../../images/default.png'
import { PRODUCT, USER_WISHLIST } from '../../constants/routes'
import ProductListItems from './ProductListItems'
import StarRatings from 'react-star-ratings';
import RatingModal from '../modal/RatingModal'
import { handleAddToCard } from '../../helpers/cart'
import { showAverage } from '../../helpers/rating'
import { useDispatch, useSelector } from 'react-redux'

import { addToWishlist,  } from '../../axios/user'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

const { TabPane } = Tabs

const SingleProduct = ({ product, onStarClick, star, setStar, comment, setComment }) => {
  const { title, images, slug, description, _id } = product
  const [toolTip, setTooltip] = useState('Click to add')

  const dispatch = useDispatch()
  const { user } = useSelector(state => ({...state}))
  const history = useHistory()


  const handleAddToWishlist = () => {
    addToWishlist(product._id, user.token)
      .then(res => {
          toast.success('Added to wishlist')
          history.push(USER_WISHLIST)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <div className="col-md-12">
        <h1 className="pt-3">
          {title}
        </h1>
      </div>

      <div className="col-md-12 pb-1">
        {product && product.ratings && product.ratings.length > 0 ? showAverage(product) : null }
      </div>


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
        <Card
          actions={[
            <Tooltip title={toolTip}>
              <div onClick={() => handleAddToCard(product, dispatch, setTooltip)}>
                <ShoppingCartOutlined className="text-primary"/>
                <br/>
                В корзину
              </div>
            </Tooltip>,

            <div onClick={handleAddToWishlist}>
              <HeartOutlined  className="text-info" />
              <br/>
              В улюблені
            </div>,

            <RatingModal onStarClick={onStarClick} star={star} comment={comment} setComment={setComment}>
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

      <div className="row">
        <Tabs
          type="card"
        >
          <TabPane
            tab="Опис"
            key={1}
          >
            {description && <div dangerouslySetInnerHTML={{ __html: description }} />}
          </TabPane>

          <TabPane
            tab="Відгуки"
            key={2}
          >
            { product.ratings && product.ratings.length ? product.ratings.map(rating => (
                <Comment
                  className="mb-3"
                  author={<a>{rating.postedBy.name}</a>}
                  content={
                    <div>
                      <StarRatings
                        name={_id}
                        numberOfStars={5}
                        starDimension="15px"
                        starSpacing="2px"
                        starRatedColor="red"
                        rating={rating.star}
                      />
                      <br/>
                      { rating.text && <div className="mt-2">{rating.text}</div> }
                    </div>
                  }
                />
            )) : <p className="text-center">Поки немає відгуків</p>}

          </TabPane>
        </Tabs>
      </div>
    </>
  )
}

export default SingleProduct
