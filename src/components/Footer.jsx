import React from 'react'

const Footer = ({length}) => {
  return (

    <>
      
      <h3>{length} list {(length===1)? "item":"items"}</h3>
    </>
  
  )
}

export default Footer;