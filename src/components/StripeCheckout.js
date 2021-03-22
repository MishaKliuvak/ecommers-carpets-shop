import React, { useState, useEffect} from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useSelector, useDispatch } from 'react-redux'
import { createPaymentIntent } from '../axios/stripe'
import { Link, useHistory } from 'react-router-dom'
import { USER_HISTORY } from '../constants/routes'



const StripeCheckout = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { user } = useSelector(state => ({...state}))

  const [successed, setSuccessed] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')

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
    createPaymentIntent(user.token)
      .then(res => {
        console.log(res.data)
        setClientSecret(res.data.clientSecret)
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
      console.log(JSON.stringify(payload, null, 4))
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
      <p className={successed ? 'result-message' : 'result-message hidden'}>
        Payment Successful. <Link to={USER_HISTORY}>See it in your purchase history</Link>
      </p>
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
              : "Pay"
            }
          </span>
        </button>

        {error && <div className="card-error mt-3">{error}</div>}
      </form>
    </>
  )
}

export default StripeCheckout
