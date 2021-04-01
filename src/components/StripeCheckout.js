import React, { useState, useEffect} from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useSelector, useDispatch } from 'react-redux'
import { createPaymentIntent } from '../axios/stripe'
import { Link, useHistory } from 'react-router-dom'
import { USER_HISTORY } from '../constants/routes'

import { Card } from 'antd'
import { DollarOutlined, CheckOutlined } from '@ant-design/icons'
import cart from '../images/cart.png'

import { createOrder, emptyCart } from '../axios/user'

const StripeCheckout = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { user, coupon } = useSelector(state => ({...state}))

  const [successed, setSuccessed] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')

  const [cartTotal, setCartTotal] = useState(0)
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
  const [payable, setPayable] = useState(0)

  const stripe = useStripe()
  const elements = useElements()

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  useEffect(() => {
    createPaymentIntent(user.token, coupon)
      .then(res => {
        console.log(res.data)
        setClientSecret(res.data.clientSecret)

        setCartTotal(res.data.cartTotal)
        setTotalAfterDiscount(res.data.totalAfterDiscount)
        setPayable(res.data.payable)
      })
      .catch(err => console.error(err))
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    setProcessing(true)

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value
        }
      }
    })

    if (payload.error) {
      setError(payload.error.message)
      setProcessing(false)
    } else {
      createOrder(payload, user.token)
        .then(res => {
          if (res.data.ok) {
            if (typeof window !== 'undefined') localStorage.removeItem('cart')

            dispatch({ type: 'ADD_TO_CART', payload: [] })
            dispatch({ type: 'COUPON_APPLIED', payload: false })
            emptyCart(user.token)
          }
        })
        .catch(err => {

        })

      setError(null)
      setProcessing(false)
      setSuccessed(true)
    }
  }

  const handleChange = async e => {
    setDisabled(e.empty)
    setError(e.error ? e.error.message : '')
  }

  return (
    <>
      { !successed &&
        <div>
          { coupon && totalAfterDiscount !== undefined
            ? (<p className="alert alert-success">{`Разом до сплати: $${totalAfterDiscount}`}</p>)
            : (<p className="alert alert-danger">Купон відсутній</p>)
          }
        </div>
      }
      <div className="text-center mb-5">
        <Card
          cover={
            <img src={cart} alt="Cart" style={{ height: 150, objectFit: 'contain', marginBottom: '-50px' }}/>
          }
          actions={[
            <>
              <DollarOutlined className="text-info" /><br/>
              Вартість: ${cartTotal}
            </>,
            <>
              <CheckOutlined className="text-success" /><br/>
              До сплати: ${payable / 100}
            </>
          ]}
        />
      </div>

      <form
        id="payment-form"
        className="stripe-form"
        onSubmit={handleSubmit}
      >
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || successed}
        >
          <span id="button-text">
            { processing
              ? <div className="spinner" id="spinner" />
              : "Оплатити"
            }
          </span>
        </button>

        {error && <div className="card-error mt-3">{error}</div>}
        <br/>
        <p className={successed ? 'result-message' : 'result-message hidden'}>
          Платіж пройшов успішно. <Link to={USER_HISTORY}>Перейти до історії покупок</Link>
        </p>
      </form>
    </>
  )
}

export default StripeCheckout
