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

    return (
        <>
            { orders && orders.map(order => (
                <div key={order._id} className="row mr-0 ml-0 mt-4 mb-4 card p-3">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div className="col-md-6">
                            <ShowPaymentInfo order={order} />
                        </div>

                        <div className="col-md-6" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                            <h6 className="mb-3">Статус доставки</h6>

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
                                <Option value="Cash on delivery">Cash on delivery</Option>
                            </Select>
                        </div>
                    </div>

                    {showOrderInTable(order)}
                </div>
            )) }
        </>
    )
}

export default Orders
