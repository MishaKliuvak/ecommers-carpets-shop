import React from 'react'
import ModalImage from "react-modal-image";

import custom from '../../images/default.png'

const TableCartItem = ({ product, ...restProps }) => {
  const { title, price, brand, color, count, images } = product
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
        <td>{count}</td>
        <td>Shipping</td>
        <td>Delete</td>
      </tr>
  )
}

export default TableCartItem
