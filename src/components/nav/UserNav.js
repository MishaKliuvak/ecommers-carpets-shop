import React from 'react'
import { Link } from 'react-router-dom'
import { USER_HISTORY, USER_PASSWORD, USER_WISHLIST } from '../../constants/routes'

const UserNav = () => {
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to={USER_HISTORY} className="nav-link">History</Link>
        </li>

        <li className="nav-item">
          <Link to={USER_PASSWORD} className="nav-link">Password</Link>
        </li>

        <li className="nav-item">
          <Link to={USER_WISHLIST} className="nav-link">WishList</Link>
        </li>
      </ul>
    </nav>
  )
}

export default UserNav
