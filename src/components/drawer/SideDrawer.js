import React from 'react'
import { Drawer, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import custom from '../../images/default.png'
import { CART } from '../../constants/routes'

const imageStyle = {
  width: '100%',
  height: '50px',
  objectFit: 'cover'
}

const SideDrawer = () => {
  const dispatch = useDispatch()
  const { drawer, cart } = useSelector(state => ({...state}))



  return (
    <Drawer
      className="text-center"
      title={`${cart.length} products`}
      placement="right"
      visible={drawer}
      onClose={() => {
        dispatch({
          type: 'SET_VISIBLE',
          payload: false
        })
      }}
    >
      {cart.length
        ? cart.map(product => (
          <div key={product._id} className="row">
            <div className="col">
              <img
                style={imageStyle}
                src={product.images.length ? product.images[0].url : custom}
                alt={product.title}
              />
              <p className="text-center bg-secondary text-light">
                {product.title} x {product.count}
              </p>
            </div>
          </div>
        )) : (
          "No products in cart"
        )
      }

      <Link to={CART}>
        <button
          className="text-center btn btn-raised btn-primary btn-block"
          onClick={() => dispatch({
            type: 'SET_VISIBLE',
            payload: false
          })}
        >
          Go to the cart
        </button>
      </Link>
    </Drawer>
  )
}

export default SideDrawer
