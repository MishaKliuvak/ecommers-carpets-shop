import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getUserCart, emptyCart, saveUserAddress, applyCoupon, cashOrder } from '../axios/user'
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { PAYMENT } from '../constants/routes'

const Checkout = () => {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [address, setAddress] = useState('')
  const [addressSaved, setAddressSaved] = useState(false)
  const [couponEntered, setCouponEntered] = useState('')
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
  const [discountError, setDiscountError] = useState('')
  const history = useHistory()

  const dispatch = useDispatch()
  const { user, COD } = useSelector(state => ({...state}))

  useEffect(() => {
    if (user) {
      getUserCart(user.token)
        .then(res => {
          setProducts(res.data.products)
          setTotal(res.data.cartTotal)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [user])

  const removeCart = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart')
    }

    dispatch({
      type: 'ADD_TO_CART',
      payload: []
    })

    emptyCart(user.token)
      .then(res => {
        setProducts([])
        setTotal(0)
        setTotalAfterDiscount(0)
        setCouponEntered('')
        toast.success('Cart is empty')
      })
  }

  const saveAddress = () => {
    saveUserAddress(address, user.token)
      .then(res => {
        if (res.data.ok) {
          setAddressSaved(true)
          toast.success('Address saved successfully')
        }
      })
  }

  const showAddress = () => (
    <>
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <button className="btn btn-primary mt-2" onClick={saveAddress}>
        Save
      </button>
    </>
  )

  const showProductSummary = () => (
    <>
      {products.length && products.map((product, i) => (
        <div key={i}>
          <p>{product.product.title} ({product.product.color}) x {product.count} = {product.product.price * product.count}</p>
        </div>
      ))}
    </>
  )

  const applyCouponHandler = () => {
    applyCoupon(couponEntered, user.token)
      .then((res) => {
        if (res.data) {
          setTotalAfterDiscount(res.data)
          dispatch({
            type: 'COUPON_APPLIED',
            payload: true
          })
        }
        if (res.data.err) {
          setDiscountError(res.data.err)
          dispatch({
            type: 'COUPON_APPLIED',
            payload: false
          })
        }
      })
  }

  const createCashOrder = () => {
      cashOrder(user.token, COD)
          .then(res => {
              console.log(res.data);

          })
          .catch(err => console.log(err))
  }

  const showApplyCoupon = () => (
    <>
      <input
        type="text"
        className="form-control"
        placeholder="Coupon"
        onChange={(e) => {
          setCouponEntered(e.target.value)
          setDiscountError('')
        }}
        value={couponEntered}
      />
      <button
        className="btn btn-primary mt-4"
        onClick={applyCouponHandler}
      >
        Apply
      </button>
    </>
  )

  return (
    <div className="row mt-4 ml-4 mr-4">
      <div className="col-md-6 ">
        <h4 className="mb-4">Delivery Address</h4>

        {showAddress()}
        <hr/>

        <h4 className="mb-3">Got Coupon?</h4>
        {showApplyCoupon()}
        {discountError && <div className="mt-2 float-right text-danger">{discountError}</div>}
      </div>

      <div className="col-md-6">
        <h4 className="mb-2">Order Summary</h4>
        <hr/>

        <p>Products {products.length}</p>
        <hr/>

        {showProductSummary()}
        <hr/>

        <p>Cart total: ${total}</p>
        {totalAfterDiscount > 0 && (
          <p className="p-2 bg-success">
            Discount Applied: ${totalAfterDiscount}
          </p>
        )}

        <div className="row">
          <div className="col-md-6">
              { COD
                  ? (
                      <button
                          className="btn btn-primary"
                          disabled={!addressSaved || !products.length}
                          onClick={createCashOrder}
                      >
                          Place Order
                      </button>
                  )
                  : (
                      <button
                          className="btn btn-primary"
                          disabled={!addressSaved || !products.length}
                          onClick={() => history.push(PAYMENT)}
                      >
                          Place Order
                      </button>
                  )
              }
            <button
              className="btn btn-primary"
              disabled={!products.length}
              onClick={removeCart}
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
