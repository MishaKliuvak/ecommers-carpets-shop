import React, { useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'
import { getCoupons, removeCoupon, createCoupon } from '../../../axios/coupon'
import 'react-datepicker/dist/react-datepicker.css'
import { DeleteOutlined, LoadingOutlined  } from '@ant-design/icons'
import AdminNav from '../../../components/nav/AdminNav'

const CreateCoupon = () => {
  const [name, setName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [discount, setDiscount] = useState('')
  const [loading, setLoading] = useState('')
  const [coupons, setCoupons] = useState([])

  const { user } = useSelector(state => ({...state}))

  useEffect(() => {
    loadAllCoupons()
  }, [])

  const loadAllCoupons = () =>
    getCoupons()
      .then(res => {
        setCoupons(res.data)
        setLoading(false)
      })
      .catch(err => console.log(err))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setName('')
        setExpiry('')
        setDiscount('')

        loadAllCoupons()

        toast.success(`${res.data.name} is created`)
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err)
      })
  }

  const handleRemove = (couponId) => {
    if (window.confirm('Are you sure to delete?')) {
      setLoading(true)
      removeCoupon(couponId, user.token)
        .then((res) => {
          loadAllCoupons()
          toast.error(`${res.data.name} was deleted`)
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div className="container-fluid pt-4">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4 className="pb-4">Create Coupon { loading && <LoadingOutlined /> }</h4>
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
                min="1"
                max="99"
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
          <br/>

          <h4 className="pb-4">{coupons.length} Coupons</h4>
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name:</th>
                <th scope="col">Expiry:</th>
                <th scope="col">Discount:</th>
                <th scope="col">Remove:</th>
              </tr>
            </thead>
            <tbody>
              { coupons.length && coupons.map(c => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{new Date(c.expiry).toLocaleDateString()}</td>
                  <td>{c.discount}%</td>
                  <td className="text-center">
                    <DeleteOutlined
                      className="text-danger pointer"
                      onClick={() => handleRemove(c._id)}
                    />
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CreateCoupon


