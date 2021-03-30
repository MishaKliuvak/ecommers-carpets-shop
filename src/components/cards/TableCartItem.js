import React from 'react'
import ModalImage from "react-modal-image";

import { useDispatch } from 'react-redux'
import custom from '../../images/default.png'

import { changeProperty, removeProperty } from '../../helpers/cart'
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons'

const TableCartItem = ({ product, size, ...restProps }) => {
  const { _id, title, price, brand, color, count, images, quantity, shipping } = product
  const dispatch = useDispatch()

  const handleRemove = e => {

  }

  return (
      <tr {...restProps}>
        { size.width > 766 && <td style={{ width: 150, height: 'auto' }}>
            <div>
                <ModalImage
                    small={ images.length ? images[0].url : custom }
                    large={ images.length ? images[0].url : custom }
                    alt={title}
                />
            </div>

        </td> }

        <td>{title}</td>
        <td>${price}</td>
        <td>{brand}</td>
        <td>{color}</td>
        <td className="text-center" style={{ fontSize: size.width < 991 && size.width > 766  ? '.5rem' : '.9rem',
            padding: size.width > 991 ? '1em' : '.7em' }}>
          <input
            min={1}
            style={{ outline: 'none', border: 'none', borderBottom: '1px solid rgba(0,0,0, .2)'}}
            max={quantity}
            type="number"
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
