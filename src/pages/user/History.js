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
        <th scope="col">Назва</th>
        <th scope="col">Вартість</th>
        <th scope="col">Бренд</th>
        <th scope="col">Колір</th>
        <th scope="col">К-сть</th>
        <th scope="col">Наявність</th>
      </tr>
      </thead>
      <tbody>
      { order.products.map((product, i) => (
        <tr key={i}>
            <td><b>{product.product ? product.product.title : 'Продукт видалено'}</b></td>
            <td>{ product.product ? product.product.price : ''}</td>
            <td>{ product.product ? product.product.brand : ''}</td>
            <td>{ product.product ? product.product.color : ''}</td>
            <td>{product.count}</td>

            <td>
                { product.product && product.product.shipping === 'Yes'
                    ? <CheckCircleOutlined className="text-success"/>
                    : <CloseCircleOutlined className="text-danger"/>
                }

            </td>

        </tr>
      )) }
      </tbody>
    </table>
  )

  const showDownloadLink = (order) => (
    <PDFDownloadLink
        disabled
      document={ <Invoice order={order} /> }
      fileName="invoice.pdf"
      className="btn btn-sm btn-block btn-outline-primary"
    >
      Завантажити PDF квитанцію
    </PDFDownloadLink>
  )

  const showEachOrders = () => orders.map((order, i) => (
    <div key={i} className="mb-4 p-3 card">
      <ShowPaymentInfo  order={order} />
      {showOrderInTable(order)}
      {/*<div className="row">*/}
      {/*  <div className="col">*/}
      {/*    {showDownloadLink(order)}*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  ))

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col-md-10">
          <h4>{ orders.length > 0 ? 'Ваші замовлення' : 'Замовлення відсутні' }</h4>
            <hr/>
            {showEachOrders()}
        </div>
      </div>
    </div>
  )
}

export default History
