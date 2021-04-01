import React from 'react'

import Jumbotron from '../components/cards/Jumbotron'
import Products from '../components/home/Products'
import CategoryList from '../components/category/CategoryList'
import SubList from '../components/subs/SubList'

const Home = () => {
    return (
      <>
          <div className="jumbotron text-danger h1 font-weight-bold text-center">
              <Jumbotron text={['Багато новинок', 'Найкращі ціни', 'Найвища якість']} />
          </div>

          <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron">Нові поступлення</h4>
          <Products sortBy='createdAt' />

          <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron">Популярні</h4>
          <Products sortBy='sold' />

          <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron">Категорії</h4>
          <CategoryList />

          <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron">Підкатегорії</h4>
          <SubList />

      </>
    )
}

export default Home
