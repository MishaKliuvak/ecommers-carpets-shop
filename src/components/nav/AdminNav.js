import React from 'react'
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
          <Link to={ADMIN_DASHBOARD} className="nav-link">Dashboard</Link>
        </li>

        <li className="nav-item">
          <Link to={ADMIN_PRODUCT} className="nav-link">Create Product</Link>
        </li>

        <li className="nav-item">
          <Link to={ADMIN_PRODUCTS} className="nav-link">Products</Link>
        </li>

        <li className="nav-item">
          <Link to={ADMIN_CATEGORIES} className="nav-link">Categories</Link>
        </li>

        <li className="nav-item">
          <Link to={ADMIN_SUB} className="nav-link">Sub Categories</Link>
        </li>

        <li className="nav-item">
          <Link to={ADMIN_COUPONS} className="nav-link">Coupons</Link>
        </li>

        <li className="nav-item">
          <Link to={USER_PASSWORD} className="nav-link">Password</Link>
        </li>
      </ul>
    </nav>
  )
}

export default AdminNav
