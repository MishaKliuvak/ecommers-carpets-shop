import React, { useEffect, useState } from 'react'

import AdminNav from '../../components/nav/AdminNav'

import { getProducts } from '../../axios/product'
import { LoadingOutlined } from '@ant-design/icons'

const AdminDashboard = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAllProducts(10)
  }, [])

  const loadAllProducts = (count) => {
    setLoading(true)
    getProducts(count)
      .then(res => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h4>Products {loading && <LoadingOutlined className="text-danger h4" />}</h4>
          {JSON.stringify(products)}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
