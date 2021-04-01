import React from 'react'
import { Link } from 'react-router-dom'

const ProductListItems = ({ product }) => {
  const { price, category, subs, shipping, color, brand, quantity, sold } = product

  const liItem = (text, value) => (
    <li className="list-group-item">
      {text}
      <span className="label label-default label-pill pull-xs-right">{value}</span>
    </li>
  )

  const linkItem = (text, value, link) => (
    <li className="list-group-item">
      {text}
      <Link className="label label-default label-pill pull-xs-right" to={link}>{value}</Link>
    </li>
  )

  return (
    <ul className="list-group">
      { liItem(`Вартість: `, `$ ${price}`) }
      { category && linkItem(`Категорія: `, `${category.name}`, `/category/${category.slug}`)}
      { subs && (
        <li className="list-group-item">
          Підкатегорії
          { subs.map(sub => (
            <Link
              key={sub.slug}
              to={`/sub/${sub.slug}`}
              className="label label-default label-pill pull-xs-right"
            >
              {sub.name}
            </Link>
          )) }
        </li>
      )}
      { liItem(`Наявність: `, `${shipping}`) }
      <li className="list-group-item">
        Колір:
        <span className="color-circle pull-xs-right" style={{ background: color }} />
        <span className="label label-default label-pill pull-xs-right color-text">{color}</span>
      </li>
      { liItem(`Бренд: `, `${brand}`) }
      { liItem(`К-сть: `, `${quantity}`) }
      { liItem(`Продано: `, `${sold}`) }
    </ul>
  )
}

export default ProductListItems
