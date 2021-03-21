import React, { useState, useEffect} from 'react'
import { getProducts, getProductsByFilter } from '../axios/product'
import { useSelector, useDispatch } from 'react-redux'
import ProductCard from '../components/cards/ProductCard'
import Star from '../components/forms/Star'

import { getCategories } from '../axios/category'
import { getSubs } from '../axios/sub'

import { Menu, Slider, Checkbox, Radio } from 'antd'
import { DollarOutlined, DownSquareOutlined, StarOutlined } from '@ant-design/icons'

const Shop = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState([0,0])
  const [ok,setOk] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [star, setStar] = useState('')
  const [subs, setSubs] = useState([])
  const [sub, setSub] = useState('')
  const [brands, setBrands] = useState(['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Asus'])
  const [selectedBrand, setSelectedBrand] = useState('')
  const [colors, setColors] = useState(['Black', 'White', 'Brown', 'Silver', 'Blue', 'Red'])
  const [selectedColor, setSelectedColor] = useState('')
  const [shipping, setShipping] = useState('')


  const { search } = useSelector(state => ({...state}))
  const { text } = search

  const dispatch = useDispatch()

  useEffect(() => {
    loadAllProducts()


    getCategories().then(res => setCategories(res.data)).catch(err => console.log(err))
    getSubs().then(res => setSubs(res.data))
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
    setSelectedCategories([])
    setStar('')
    setPrice(value)
    setSub('')
    setSelectedBrand('')
    setSelectedColor('')

    setTimeout(() => {
      setOk(!ok)
    }, 300)
  }

  const handleCheck = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: {
        text: ''
      }
    })
    setPrice([0,0])
    setStar('')
    setSub('')
    setSelectedBrand('')
    setSelectedColor('')

    let inTheState = [...selectedCategories]
    let justChecked = e.target.value
    let foundInTheState = inTheState.indexOf(justChecked)

    if (foundInTheState === -1) {
      inTheState.push(justChecked)
    } else {
      inTheState.splice(foundInTheState, 1)
    }

    setSelectedCategories(inTheState)
    fetchProducts({ category: inTheState })
  }

  const showCategories = () => categories.map(category => (
    <div key={category._id}>
      <Checkbox
        onChange={handleCheck}
        className="pb-2 pl-4 pr-4"
        value={category._id}
        name="category"
        checked={selectedCategories.includes(category._id)}
      >
        {category.name}
      </Checkbox>
      <br/>
    </div>
  ))

  const handleStarClick = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: {
        text: ''
      }
    })
    setPrice([0,0])
    setSelectedCategories([])
    setStar(e)
    setSub('')
    setSelectedColor('')
    setSelectedBrand('')


    fetchProducts({ stars: e })
  }

  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5}/>
      <Star starClick={handleStarClick} numberOfStars={4}/>
      <Star starClick={handleStarClick} numberOfStars={3}/>
      <Star starClick={handleStarClick} numberOfStars={2}/>
      <Star starClick={handleStarClick} numberOfStars={1}/>
    </div>
  )

  const handleSub = (sub) => {
    setSub(sub._id)

    dispatch({
      type: 'SEARCH_QUERY',
      payload: {
        text: ''
      }
    })
    setPrice([0,0])
    setSelectedCategories([])
    setStar('')
    setSelectedColor('')
    setSelectedBrand('')
    fetchProducts({ sub })
  }

  const showSubs = () => subs.map((sub) => (
    <div key={sub._id} onClick={() => handleSub(sub)} className="p-1 m-1 badge badge-secondary" style={{ cursor: "pointer" }}>
      {sub.name}
    </div>
  ))

  const handleBrand = (e) => {
    setSub('')

    dispatch({
      type: 'SEARCH_QUERY',
      payload: {
        text: ''
      }
    })
    setPrice([0,0])
    setSelectedCategories([])
    setStar('')
    setSelectedColor('')
    setSelectedBrand(e.target.value)

    fetchProducts({ brand: e.target.value })
  }

  const showBrands = () => brands.map(brand => (
    <>
      <Radio className="pb-1 pl-1 pr-4" value={brand} name={brand} checked={brand === selectedBrand} onChange={handleBrand}>
        {brand}
      </Radio>
      <br/>
    </>
  ))

  const handleColor = (e) => {
    setSub('')

    dispatch({
      type: 'SEARCH_QUERY',
      payload: {
        text: ''
      }
    })
    setPrice([0,0])
    setSelectedCategories([])
    setStar('')
    setSelectedBrand('')
    setSelectedColor(e.target.value)

    fetchProducts({ color: e.target.value })
  }

  const showColors = () => colors.map(color => (
    <>
      <Radio className="pb-1 pl-1 pr-4" value={color} name={color} checked={color === selectedColor} onChange={handleColor}>
        {color}
      </Radio>
      <br/>
    </>
  ))

  const showShipping = (e) => {

  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-4">
          <h4>Search/Filter</h4>
          <hr/>

          <Menu defaultOpenKeys={['1', '2', '3', '4','5','6','7']} mode="inline">
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

            <Menu.SubMenu
              key="2"
              title={<span className="h6"><DownSquareOutlined/> Categories</span>}>
              <div>
                {showCategories()}
              </div>
            </Menu.SubMenu>

            <Menu.SubMenu
              key="3"
              title={<span className="h6"><StarOutlined/> Rating</span>}>
              <div style={{ marginTop: "-10px" }}>
                {showStars()}
              </div>
            </Menu.SubMenu>

            <Menu.SubMenu
              key="4"
              title={<span className="h6"><DownSquareOutlined/> Sub Categories</span>}>
              <div className="pl-4 pr-4">
                {showSubs()}
              </div>
            </Menu.SubMenu>

            <Menu.SubMenu
              key="5"
              title={<span className="h6"><DownSquareOutlined/> Brands</span>}>
              <div className="pl-4 pr-4">
                {showBrands()}
              </div>
            </Menu.SubMenu>

            <Menu.SubMenu
              key="6"
              title={<span className="h6"><DownSquareOutlined/> Colors</span>}>
              <div className="pl-4 pr-4">
                {showColors()}
              </div>
            </Menu.SubMenu>

            <Menu.SubMenu
              key="7"
              title={<span className="h6"><DownSquareOutlined/> Shipping</span>}>
              <div className="pl-4 pr-4">
                {showShipping()}
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
