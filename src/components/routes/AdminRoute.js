import React, { useEffect, useState } from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import LoadingToRedirect from './LoadingToRedirect'
import isAdmin from '../../helpers/isAdmin'

const AdminRoute = ({children, ...restProps}) => {
  const { user } = useSelector((state) => ({...state}))
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    if (user && user.token) {
      isAdmin(user.token)
        .then(res => {
          console.log('ADMIN RES')
          setAdmin(true)
        })
        .catch(err => {
          console.log('NOT ADMIN')
          setAdmin(false)
        })
    }
  }, [user])

  return admin ? (
    <Route
      exact
      {...restProps}
      render={() => children}
    />
  ) : (
    <LoadingToRedirect />
  )
}

export default AdminRoute
