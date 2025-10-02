import React from 'react'

const Image = ({size,border,src,alt}) => {
  return (
    <div>
        <img style={{size:size,border:border}} src={src} alt={alt}/>
    </div>
  )
}

export default Image