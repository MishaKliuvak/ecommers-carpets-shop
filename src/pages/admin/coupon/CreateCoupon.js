import React, { useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'
import { getCoupons, removeCoupon, createCoupon } from '../../../axios/coupon'
import 'react-datepicker/dist/react-datepicker.css'
import { DeleteOutlined } from '@ant-design/icons'
import AdminNav from '../../../components/nav/AdminNav'

const CreateCoupon = () => {
  const [name, setName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [discount, setDiscount] = useState('')
  const [loading, setLoading] = useState('')

  const { user } = useSelector(state => ({...state}))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false)
        setName('')
        setExpiry('')
        setDiscount('')

        toast.success(`${res.data.name} is created`)
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err)
      })
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Coupon</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-muted">Name:</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label className="text-muted">Discount %:</label>
              <input
                type="number"
                className="form-control"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="text-muted">Expiry:</label>
              <br/>
              <DatePicker
                className="form-control"
                selected={new Date()}
                value={expiry}
                required
                onChange={(date) => setExpiry(date)}
              />
            </div>

            <button className="btn btn-outline-primary">Save</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateCoupon


