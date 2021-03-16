import React from 'react'
import Typewriter from 'typewriter-effect'

const Jumbotron = ({ text }) => {
  return (
    <Typewriter
      options={{
        strings: text,
        autoStart: true,
        loop: true
      }}
      onInit={() => console.log('init')}
    />
  )
}

export default Jumbotron
