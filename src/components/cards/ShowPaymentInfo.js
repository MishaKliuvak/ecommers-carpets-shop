import React from 'react'

const ShowPaymentInfo = ({ order }) => {
  return (
    <div>
      <p>
        <span><b>Order Id:</b> {order.paymentIntent.id}</span><br/>
        <span><b>Amount:</b> {(order.paymentIntent.amount / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })}</span><br/>
        <span><b>Currency:</b> {order.paymentIntent.currency.toUpperCase()}</span><br/>
        <span><b>Payment method:</b> {order.paymentIntent.payment_method_types[0]}</span><br/>
        <span><b>Payment:</b> {order.paymentIntent.status.toUpperCase()}</span><br/>
        <span><b>Order on:</b> {new Date(order.paymentIntent.created * 1000).toLocaleString()}</span><br/>
        <span className="badge bg-primary text-white">Status: {order.orderStatus}</span><br/>
      </p>
    </div>
  )
}

export default ShowPaymentInfo
