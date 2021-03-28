import React from 'react'
import StarRatings from 'react-star-ratings'

const Star = ({ starClick, numberOfStars }) => {
  return (
    <div className="mb-1">
      <StarRatings
        changeRating={() => starClick(numberOfStars)}
        numberOfStars={numberOfStars}
        starDimension="20px"
        starSpacing="2px"
        starHoverColor="red"
        starEmptyColor="red"
      />
      <br/>
    </div>
  )
}

export default Star
