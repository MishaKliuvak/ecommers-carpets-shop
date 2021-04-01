import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { HOME } from '../../constants/routes'

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5)
  let history = useHistory()

  useEffect(() => {

    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount)
    }, 1000)

    count === 0 && history.push(HOME)
    return () => clearInterval(interval)
  }, [count])

  return (
    <div className="container p-5 text-center">
      <p>Переадресація через {count}</p>
    </div>
  )
}

export default LoadingToRedirect
