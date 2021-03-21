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
  }
}
