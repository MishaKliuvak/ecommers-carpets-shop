import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserCart } from '../axios/user'

const Checkout = () => {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const dispatch = useDispatch()
  const { user } = useSelector(state => ({...state}))

  useEffect(() => {
    getUserCart(user.token)
      .then(res => {
        console.log(JSON.stringify(res))
        setProducts(res.data.products)
        setTotal(res.data.cartTotal)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const saveAddress = () => {

  }

  return (
    <div className="row">
      <div className="col-md-6">
        <h4 className="mb-4">Delivery Address</h4>
        textarea

        <button
          className="btn btn-primary mt-2"
          onClick={saveAddress}
        >
          Save
        </button>
        <hr/>
        <h4 className="mb-2">Gor Coupon?</h4>
        Coupon input
      </div>

      <div className="col-md-6">
        <h4 className="mb-2">Order Summary</h4>
        <h1>{total}</h1>
        {JSON.stringify(products)}
        <hr/>
        <p>Products x</p>
        <hr/>
        <p>List of products</p>
        <hr/>
        <p>Cart total: $x</p>

        <div className="row">
          <div className="col-md-6">
            <button
              className="btn btn-primary"
            >
              Place Order
            </button>
            <button
              className="btn btn-primary"
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
