import React, { useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'
import { getCoupons, removeCoupon, createCoupon } from '../../../axios/coupon'
import 'react-datepicker/dist/react-datepicker.css'
import { DeleteOutlined, LoadingOutlined  } from '@ant-design/icons'
import AdminNav from '../../../components/nav/AdminNav'
import {Input} from "antd";

const CreateCoupon = () => {
  const [name, setName] = useState('')
  const [expiry, setExpiry] = useState(new Date())
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
        setExpiry(new Date())
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
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Купони { loading && <LoadingOutlined /> }</h4>
          <hr/>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <h6>Назва:</h6>
              <Input
                  placeholder="Назва"
                  autoFocus
                  type="text"
                  required
                  className="mb-3"
                  value={name}
                  onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <h6>Скидка %:</h6>
              <Input
                  placeholder="Скидка"
                  min="1"
                  max="99"
                  type="number"
                  required
                  className="mb-3"
                  value={discount}
                  onChange={e => setDiscount(e.target.value)}
              />
            </div>

            <div className="form-group">
              <h6>Дата дії:</h6>
              <DatePicker
                className="ant-input pointer"
                placeholder="Дата дії"
                defaultValue={new Date()}
                selected={new Date()}
                value={expiry}
                required
                onChange={(date) => setExpiry(date)}
              />
            </div>

            <button className="btn btn-outline-primary">Додати</button>
          </form>
          <br/>

          <h4 className="pb-4">{coupons.length} купонів</h4>
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Назва:</th>
                <th scope="col">Термін:</th>
                <th scope="col">Скидка:</th>
                <th scope="col">Видалити:</th>
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


