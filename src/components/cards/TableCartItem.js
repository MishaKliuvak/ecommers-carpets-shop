import React from 'react'

const TableCartItem = ({ product, ...restProps }) => {
  return (
    <tbody {...restProps}>
      <tr>
        <td>
          Image
        </td>
        <td>{product.title}</td>
        <td>${product.price}</td>
        <td>{product.brand}</td>
        <td>{product.color}</td>
        <td>{product.count}</td>
        <td>Shipping</td>
        <td>Delete</td>
      </tr>
    </tbody>
  )
}

export default TableCartItem
