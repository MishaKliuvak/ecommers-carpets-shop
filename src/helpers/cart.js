import _ from 'lodash'

export const handleAddToCard = (product, dispatch, setTooltip) => {

  let cart = []

  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'))
    }
    cart.push({
      ...product,
      count: 1
    })

    let unique = _.uniqWith(cart, _.isEqual)
    localStorage.setItem('cart', JSON.stringify(unique))
    setTooltip('Added')

    dispatch({
      type: 'ADD_TO_CART',
      payload: unique
    })

    dispatch({
      type: 'SET_VISIBLE',
      payload: true
    })
  }
}

export const changeProperty = (id, value, dispatch) => {
  let cart = []

  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'))
    }

    cart.forEach((product, i) => {
      if (product._id === id) {
        cart[i].count = value
      }
    })

    localStorage.setItem('cart', JSON.stringify(cart))
    dispatch({
      type: 'ADD_TO_CART',
      payload: cart
    })
  }
}

export const removeProperty = (id, dispatch) => {
  let cart = []

  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'))
    }

    cart.forEach((product, i) => {
      if (product._id === id) {
        cart.splice(i, 1)
      }
    })

    localStorage.setItem('cart', JSON.stringify(cart))
    dispatch({
      type: 'ADD_TO_CART',
      payload: cart
    })
  }
}
