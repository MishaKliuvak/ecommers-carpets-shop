import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getSubs } from '../../axios/sub'
import { SUB } from '../../constants/routes'

const SubList = () => {
  const [subs, setSubs] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    getSubs()
      .then(res => {
        setLoading(false)
        setSubs(res.data)
      })
      .catch(err => {
        setLoading(false)
        console.error(err)
      })
  }, [])

  const showSubs = () => subs.length && subs.map(s =>
    <Link
      to={`${SUB}/${s.slug}`}
      key={s._id}
      className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3">
      {s.name}
    </Link>
  )

  return (
    <div className="container">
      <div className="row">
        { loading ? (<h4 className="text-center">Loading ...</h4>) : showSubs() }
      </div>
    </div>
  )
}

export default SubList
