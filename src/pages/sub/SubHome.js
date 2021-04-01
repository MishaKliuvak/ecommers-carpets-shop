import React, { useState, useEffect} from 'react'
import { getSub } from '../../axios/sub'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/cards/ProductCard'


const SubHome = () => {
  const [sub, setSub] = useState({})
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const { slug } = useParams()

  useEffect(() => {
    setLoading(true)

    getSub(slug)
      .then(s => {
        setLoading(false)
        setSub(s.data.sub)
        setProducts(s.data.products)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
            { loading
              ? 'Loading...'
              : `${products.length} товарів в  "${sub.name}"`
            }
          </h4>
        </div>
      </div>

      <div className="row">
        {products.length
          ? (
            products.map(product => (
              <div className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))
          ) : <div className="col text-center">Немає товарів</div>}
      </div>
    </div>
  )
}

export default SubHome
