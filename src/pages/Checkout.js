import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getUserCart, emptyCart, saveUserAddress, applyCoupon, cashOrder } from '../axios/user'
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {PAYMENT, USER_HISTORY} from "../constants/routes";
import {Tag} from "antd";

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
  const { user, COD, coupon } = useSelector(state => ({...state}))

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
      <button style={{ width: '100%'}} className="btn btn-outline-primary mt-3" onClick={saveAddress}>
        Save
      </button>
    </>
  )

  const showProductSummary = () => (
    <>
      {products.length && products.map((product, i) => (
        <div key={i}>
            <p style={{ background: '#f9f9f9', padding: '5px', border: '1px solid rgba(0,0,0,.1)'}}>
                {product.product.title} <span style={{ color: 'rgba(0,0,0,.3)'}}>x {product.count}</span> = <b>₴ {product.count * product.product.price}</b>
            </p>
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
      cashOrder(user.token, COD, coupon)
          .then(res => {
              if (res.data.ok) {
                  if (typeof window !== 'undefined') localStorage.removeItem('cart')
                  dispatch({ type: 'ADD_TO_CART', payload: [] })
                  dispatch({ type: 'COUPON_APPLIED', payload: false })
                  dispatch({ type: 'COD', payload: false })
                  emptyCart(user.token)
                  setTimeout(() => {
                    history.push(USER_HISTORY)
                  }, 1000)

              }
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
          style={{ width: '100%'}} className="btn btn-raised btn-primary mt-3"
        onClick={applyCouponHandler}
      >
        Apply
      </button>
    </>
  )

  return (
      <div className="container mt-4">
          <div className="row mt-4 ml-4 mr-4">
              <div className="col-md-6 ">
                  <h4 className="mb-3">Delivery Address</h4>
                  <hr/>
                  {showAddress()}
                  <br/><br/>

                  <h4 className="mb-3">Got Coupon?</h4>
                  {showApplyCoupon()}
                  {discountError && <div className="mt-2 float-right text-danger">{discountError}</div>}
              </div>

              <div className="col-md-6">
                  <h4 className="mb-2">Order Summary</h4>
                  <hr/>

                  {showProductSummary()}
                  <hr/>

                  <p style={{ fontSize: '16px' }} className="mb-3 text-right">
                      Total: <b>&nbsp; ₴ {total}</b>
                  </p>
                  {totalAfterDiscount > 0 && (
                      <Tag style={{ fontSize: '14px', width: '100%', padding: '5px' }} className="mb-3" color="success">
                          Discount Applied: <b>${totalAfterDiscount}</b>
                      </Tag>
                  )}

                  <div className="row">
                      <div className="col-md-6" style={{ display: 'flex' }}>
                          { COD
                              ? (
                                  <button
                                      className="btn mr-3 btn-primary btn-raised"
                                      disabled={!addressSaved || !products.length}
                                      onClick={createCashOrder}
                                  >
                                      Place Order
                                  </button>
                              )
                              : (
                                  <button
                                      className="btn mr-3 btn-primary btn-raised"
                                      disabled={!addressSaved || !products.length}
                                      onClick={() => history.push(PAYMENT)}
                                  >
                                      Place Order
                                  </button>
                              )
                          }
                          <button
                              className="btn btn-outline-primary"
                              disabled={!products.length}
                              onClick={removeCart}
                          >
                              Empty Cart
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Checkout
