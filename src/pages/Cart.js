import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { CART, CHECKOUT, LOGIN, SHOP } from '../constants/routes'
import TableCartItem from '../components/cards/TableCartItem'
import { userCart } from '../axios/user'
import {Badge, Tag } from "antd";
import { ClockCircleOutlined } from '@ant-design/icons'
import {useWindowSize} from "../hooks/useWindowSize";

const Cart = () => {
  const { cart, user } = useSelector(state => ({...state}))
  const dispatch = useDispatch()
  const history = useHistory()

  const size = useWindowSize();

  const getTotal = () => cart.reduce((current, next) => current + next.count * next.price, 0)

  const saveOrder = () => {
    userCart(cart, user.token)
      .then((res) => {
        console.log(res)
        if (res.data.ok) history.push(CHECKOUT)
      })
      .catch((err) => console.log(err))
  }

  const saveCashOrder = () => {
    dispatch({ type: 'COD', payload: true })
    userCart(cart, user.token)
        .then((res) => {
          console.log(res)
          if (res.data.ok) history.push(CHECKOUT)
        })
        .catch((err) => console.log(err))
  }

  const style = {
     fontSize: size.width < 991 && size.width > 766  ? '.5rem' : '.9rem',
      padding: size.width > 991 ? '1em' : '.7em'
  }

  const showCartTable = () => (
      <>
          <table className="table table-bordered" style={style}>
              <thead className="thead-light">
              <tr>
                  { size.width > 766 && <th scope="col" style={style}>Image</th> }
                  <th scope="col" style={style}>Title</th>
                  <th scope="col" style={style}>Price</th>
                  <th scope="col" style={style}>Brand</th>
                  <th scope="col" style={style}>Color</th>
                  <th scope="col" style={style}>Count</th>
                  <th scope="col" style={style}>Shipping</th>
                  <th scope="col" style={style}>Remove</th>
              </tr>
              </thead>
              <tbody>
              { cart.map((c, i) => (
                  <TableCartItem size={size} key={c._id} product={c} />
              )) }
              </tbody>

          </table>
      </>

  )

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <h4 style={{ fontSize: size.width < 991 && size.width > 766  && '.8rem' }}>Cart ({cart.length} products)</h4>
          <hr/>
          {!cart.length ?
            <p>
              Cart is empty. <Link to={SHOP}>Continue Shopping</Link>
            </p>
            : (
              showCartTable()
          )}
        </div>

        <div className="col-md-4">
          <h4 style={{ fontSize: size.width < 991 && size.width > 766  && '.8rem' }}>Order Summary</h4>
          <hr/>

          {cart.map((c,i) => (
            <div key={i} >
              <p style={{ background: '#f9f9f9', padding: '5px', border: '1px solid rgba(0,0,0,.1)'}}>
                  {c.title} <span style={{ color: 'rgba(0,0,0,.3)'}}>x {c.count}</span> = <b>₴ {c.count * c.price}</b>
              </p>
            </div>
          ))}
          <hr/>
            <p  style={{ fontSize: '16px' }}  className="mb-3 text-right" color="default">
                Total: <b>&nbsp; ₴ {getTotal()}</b>
            </p>


          {
            user ? (
              <div className="mt-3">
                <button
                    className="btn btn-raised btn-sm btn-primary"
                    onClick={saveOrder}
                    style={{ width: '100%', fontSize: size.width < 991 && size.width > 766  && '.5rem', padding: '10px'}}
                    disabled={!cart.length}
                >
                  Proceed to Checkout
                </button>
                  <br/>
                <button
                    className="btn btn-outline-primary btn-sm mt-1"
                    onClick={saveCashOrder}
                    style={{ width: '100%', fontSize: size.width < 991 && size.width > 766  && '.5rem', padding: '10px' }}
                    disabled={!cart.length}
                >
                  Pay cash on Delivery
                </button>
              </div>
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
