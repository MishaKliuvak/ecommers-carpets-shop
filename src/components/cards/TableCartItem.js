import React from 'react'
import ModalImage from "react-modal-image";

import { useDispatch } from 'react-redux'
import custom from '../../images/default.png'

import { changeProperty, removeProperty } from '../../helpers/cart'
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons'

const TableCartItem = ({ product, ...restProps }) => {
  const { _id, title, price, brand, color, count, images, quantity, shipping } = product
  const dispatch = useDispatch()

  const handleRemove = e => {

  }

  return (
      <tr {...restProps}>
        <td style={{ width: 150, height: 'auto' }}>
          <div>
            <ModalImage
              small={ images.length ? images[0].url : custom }
              large={ images.length ? images[0].url : custom }
              alt={title}
            />
          </div>

        </td>
        <td>{title}</td>
        <td>${price}</td>
        <td>{brand}</td>
        <td>{color}</td>
        <td className="text-center">
          <input
            min={1}
            max={quantity}
            type="number"
            className="form-control"
            value={count}
            onChange={(e) => changeProperty(_id, e.target.value, dispatch)}
          />
        </td>
        <td className="text-center">
          { shipping === "Yes"
            ? <CheckCircleOutlined className="text-success" />
            : <CloseCircleOutlined className="text-danger" />
          }
        </td>
        <td className="text-center">
          <CloseOutlined
            onClick={() => removeProperty(_id, dispatch)}
            className="text-danger pointer"
          />
        </td>
      </tr>
  )
}

export default TableCartItem
