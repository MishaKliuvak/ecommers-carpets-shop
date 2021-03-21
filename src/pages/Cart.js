import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { SHOP } from '../constants/routes'

const Cart = () => {
  const { cart, user } = useSelector(state => ({...state}))
  const dispatch = useDispatch()

  const getTotal = () => cart.reduce((current, next) => current + next.count * next.price, 0)


  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart ({cart.length} products)</h4>
          {!cart.length ?
            <h4>
              Cart is empty. <Link to={SHOP}>Continue Shopping</Link>
            </h4>
            : (
            "Show cart items"
          )}
        </div>

        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr/>

          <p>Products</p>
          {cart.map((c,i) => (
            <div key={i}>
              <p>{c.title} x {c.count} = ${c.count * c.price}</p>
            </div>
          ))}
          <hr/>

          Total: <b>${getTotal()}</b>
          <hr/>

          {
            user ? (
              <button className="btn btn-sm btn-primary mt-2">Proceed to Checkout</button>
            ) : (
              <button className="btn btn-sm btn-primary mt-2">Login to Checkout</button>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Cart
