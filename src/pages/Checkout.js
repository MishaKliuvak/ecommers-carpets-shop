import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserCart, emptyCart, saveUserAddress } from '../axios/user'
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Checkout = () => {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [address, setAddress] = useState('')
  const [addressSaved, setAddressSaved] = useState(false)

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

  return (
    <div className="row">
      <div className="col-md-6">
        <h4 className="mb-4">Delivery Address</h4>

        <ReactQuill theme="snow" value={address} onChange={setAddress} />
        <button className="btn btn-primary mt-2" onClick={saveAddress}>
          Save
        </button>
        <hr/>

        <h4 className="mb-2">Gor Coupon?</h4>
        Coupon input
      </div>

      <div className="col-md-6">
        <h4 className="mb-2">Order Summary</h4>
        <hr/>

        <p>Products {products.length}</p>
        <hr/>

        {products.length && products.map((product, i) => (
          <div key={i}>
            <p>{product.product.title} ({product.product.color}) x {product.count} = {product.product.price * product.count}</p>
          </div>
        ))}
        <hr/>

        <p>Cart total: ${total}</p>

        <div className="row">
          <div className="col-md-6">
            <button
              className="btn btn-primary"
              disabled={!addressSaved || !products.length}
            >
              Place Order
            </button>
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
