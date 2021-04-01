import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ADMIN_CATEGORIES,
  ADMIN_COUPONS,
  ADMIN_DASHBOARD,
  ADMIN_PRODUCT,
  ADMIN_PRODUCTS,
  ADMIN_SUB,
  USER_PASSWORD,
} from '../../constants/routes'

const AdminNav = () => {

  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to={ADMIN_DASHBOARD} className="nav-link">Замовлення</Link>
        </li>

        <li className="nav-item">
          <Link to={ADMIN_PRODUCT} className="nav-link">Новий товар</Link>
        </li>

        <li className="nav-item">
          <Link to={ADMIN_PRODUCTS} className="nav-link">Товари</Link>
        </li>

        <li className="nav-item">
          <Link to={ADMIN_CATEGORIES} className="nav-link">Категорії</Link>
        </li>

        <li className="nav-item">
          <Link to={ADMIN_SUB} className="nav-link">Підкатегорії</Link>
        </li>

        <li className="nav-item">
          <Link to={ADMIN_COUPONS} className="nav-link">Купони</Link>
        </li>
      </ul>
    </nav>
  )
}

export default AdminNav
