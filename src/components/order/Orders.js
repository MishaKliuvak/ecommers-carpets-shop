import React from 'react'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import ShowPaymentInfo from "../cards/ShowPaymentInfo"
import { Select } from 'antd';

const { Option } = Select;

const Orders = ({ orders, handleStatusChange }) => {
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

    return (
        <>
            { orders && orders.map(order => (
                <div key={order._id} className="row mb-3 bg-light p-4">
                    <div className="col-md-6">
                        <ShowPaymentInfo order={order} />
                    </div>

                    <div className="col-md-6" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                            <h6 className="mb-3">Delivery Status</h6>

                            <Select
                                onChange={value => handleStatusChange(order._id, value)}
                                defaultValue={ order.orderStatus }
                                className="form-control text-center"
                                name="status"
                            >
                                <Option value="Not processed">Not Processed</Option>
                                <Option value="Processing">Processing</Option>
                                <Option value="Dispatched">Dispatched</Option>
                                <Option value="Cancelled">Cancelled</Option>
                                <Option value="Completed">Completed</Option>
                            </Select>
                    </div>

                    {showOrderInTable(order)}
                </div>
            )) }
        </>
    )
}

export default Orders
