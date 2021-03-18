import React, { useState, useEffect} from 'react'
import { getProducts, getProductsByFilter } from '../axios/product'
import { useSelector, useDispatch } from 'react-redux'
import ProductCard from '../components/cards/ProductCard'

import { Menu, Slider } from 'antd'
import { DollarOutlined } from '@ant-design/icons'

const Shop = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState([0,0])
  const [ok,setOk] = useState(false)

  const { search } = useSelector(state => ({...state}))
  const { text } = search

  const dispatch = useDispatch()

  useEffect(() => {
    loadAllProducts()
  }, [])

  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text })
    }, 300)

    return () => clearTimeout(delayed)
  }, [text])

  useEffect(() => {
    fetchProducts({ price })
  }, [ok])

  const fetchProducts = (arg) => {
    getProductsByFilter(arg)
      .then(res => {
        setProducts(res.data)
      })
      .catch(err => console.log(err))
  }

  const loadAllProducts = () => {
    getProducts(12)
      .then(res => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch(err => console.error(err))
  }

  const handleSlider = (value) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: {
        text: ''
      }
    })

    setPrice(value)
    setTimeout(() => {
      setOk(!ok)
    }, 300)
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-4">
          <h4>Search/Filter</h4>
          <hr/>

          <Menu defaultOpenKeys={['1', '2']} mode="inline" style={{ background: 'transparent'}}>
            <Menu.SubMenu
              key="1"
              title={<span className="h6"><DollarOutlined/> Price</span>}>
                 <div>
                   <Slider
                     max={4999}
                     className="ml-4 mr-4"
                     tipFormatter={(value) => `$${value}`}
                     range
                     value={price}
                     onChange={handleSlider}
                   />
                 </div>
            </Menu.SubMenu>
          </Menu>
        </div>

        <div className="col-md-9">
          <h4 className="pt-4">{ loading ? 'Loading...' : 'Products' }</h4>
          {products.length < 1 && <p>Products not found</p>}

          <div className="row pb-5">
            {products.map(product => (
              <div key={product._id} className="col-md-4 mt-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
