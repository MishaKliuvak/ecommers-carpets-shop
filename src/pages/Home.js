import React from 'react'

import Jumbotron from '../components/cards/Jumbotron'
import Products from '../components/home/Products'
import CategoryList from '../components/category/CategoryList'

const Home = () => {
    return (
      <>
          <div className="jumbotron text-danger h1 font-weight-bold text-center">
              <Jumbotron text={['Latest arrivals', 'Best Sellers']} />
          </div>

          <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron">New Arrivals</h4>
          <Products sortBy='createdAt' />

          <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron">Best Sellers</h4>
          <Products sortBy='sold' />

          <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron">Categories</h4>
          <CategoryList />

      </>
    )
}

export default Home
