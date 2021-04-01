import React from 'react'

const ShowPaymentInfo = ({ order }) => {
  return (
    <div>
      <p>
        <span><b>Номер замовлення:</b> {order.paymentIntent.id}</span><br/>
        <span><b>Вартість:</b> {(order.paymentIntent.amount / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })}</span><br/>
        <span><b>Метод оплати:</b> {order.paymentIntent.payment_method_types[0]}</span><br/>
        <span><b>Статус оплати:</b> {order.paymentIntent.status}</span><br/>
        <span><b>Дата замовлення:</b> {new Date(order.paymentIntent.created * 1000).toLocaleString()}</span><br/>
        <span className="badge bg-primary text-white">Статус: {order.orderStatus}</span><br/>
      </p>
    </div>
  )
}

export default ShowPaymentInfo
