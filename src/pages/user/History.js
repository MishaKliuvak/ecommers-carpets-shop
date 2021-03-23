import React, { useState, useEffect } from 'react'
import UserNav from '../../components/nav/UserNav'
import { PDFDownloadLink } from '@react-pdf/renderer';

import ShowPaymentInfo from '../../components/cards/ShowPaymentInfo'
import Invoice from '../../components/order/Invoice'
import { getUserOrders } from '../../axios/user'
import { useSelector, useDispatch } from 'react-redux'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'

const History = () => {
  const [orders, setOrders] = useState([])
  const { user } = useSelector(state => ({...state}))

  useEffect(() => {
    loadUserOrders()
  }, [])

  const loadUserOrders = () => getUserOrders(user.token)
    .then(res => {
      console.log(res.data)
      setOrders(res.data)
    })
    .catch(err => {

    })

  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Price</th>
        <th scope="col">Brand</th>
        <th scope="col">Color</th>
        <th scope="col">Count</th>
        <th scope="col">Shipping</th>
      </tr>
      </thead>
      <tbody>
      { order.products.map((product, i) => (
        <tr key={i}>
          <td><b>{product.product.title}</b></td>
          <td>{product.product.price}</td>
          <td>{product.product.brand}</td>
          <td>{product.product.color}</td>
          <td>{product.count}</td>
          <td>
            { product.product.shipping === 'Yes'
              ? <CheckCircleOutlined className="text-success" />
              : <CloseCircleOutlined className="text-danger" />
            }
          </td>

        </tr>
      )) }
      </tbody>
    </table>
  )

  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={ <Invoice order={order} /> }
      fileName="invoice.pdf"
      className="btn btn-sm btn-block btn-outline-primary"
    >
      Download PDF
    </PDFDownloadLink>
  )

  const showEachOrders = () => orders.map((order, i) => (
    <div key={i} className="m-5 p-3 card">
      <ShowPaymentInfo  order={order} />
      {showOrderInTable(order)}
      <div className="row">
        <div className="col">
          {showDownloadLink(order)}
        </div>
      </div>
    </div>
  ))

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col text-center">
          <h4>{ orders.length > 0 ? 'User purchase orders' : 'No purchase orders' }</h4>
          {showEachOrders()}
        </div>
      </div>
    </div>
  )
}

export default History
