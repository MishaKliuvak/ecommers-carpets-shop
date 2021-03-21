import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { CART, LOGIN, SHOP } from '../constants/routes'
import TableCartItem from '../components/cards/TableCartItem'

const Cart = () => {
  const { cart, user } = useSelector(state => ({...state}))
  const dispatch = useDispatch()

  const getTotal = () => cart.reduce((current, next) => current + next.count * next.price, 0)

  const saveOrder = () => {

  }

  const showCartTable = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      { cart.map((c, i) => (
        <TableCartItem key={c._id} product={c} />
      )) }
    </table>
  )

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart ({cart.length} products)</h4>
          {!cart.length ?
            <p>
              Cart is empty. <Link to={SHOP}>Continue Shopping</Link>
            </p>
            : (
              showCartTable()
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
              <button
                className="btn btn-sm btn-primary mt-2"
                onClick={saveOrder}
                disabled={!cart.length}
              >
                Proceed to Checkout
              </button>
            ) : (
                <Link
                  className="btn btn-sm btn-primary mt-2"
                  to={{
                    pathname: LOGIN,
                    state: { from: CART },
                  }}
                >
                  Login to Checkout
                </Link>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Cart
