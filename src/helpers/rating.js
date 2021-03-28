import React from 'react'
import StarRatings from 'react-star-ratings'

export const showAverage = (product, center = false) => {
  if (product && product.ratings) {

    let ratingsArray = product.ratings
    let total = []
    let length = ratingsArray.length

    ratingsArray.map((rating) => total.push(rating.star))
    let totalReduced = total.reduce((previousValue, nextValue) => previousValue + nextValue, 0)

    let highest = length * 5

    let result = (totalReduced * 5) / highest

    return (
      <div className={`${center ? 'text-center' : 'text-left'} pb-1`}>
        <span>
          <StarRatings
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="red"
            editing={false}
            rating={result}
          />
          &nbsp; ({product.ratings.length} votes)
        </span>
      </div>
    )
  }
}

