import React, { useEffect, useState } from 'react'

import AdminNav from '../../components/nav/AdminNav'
import Orders from '../../components/order/Orders'
import { getOrders, changeStatus } from "../../axios/admin"
import { useSelector, useDispatch } from 'react-redux'
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([])
  const { user } = useSelector(state => ({...state}))

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = () =>
      getOrders(user.token)
          .then(res => {
            console.log(res.data);
            setOrders(res.data)
          })
          .catch(err => console.log(err))

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token)
        .then(res => {
          toast.success('Status updated')
          loadOrders()
        })
        .catch(err => {
          console.log(err);
        })
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4 className="mb-4">Dashboard</h4>
            <hr/>
          <Orders
              orders={orders}
              handleStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
