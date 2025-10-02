import React from 'react'

const Header = ({title, color, size , font}) => {
  return (
    <div style={{
        color: color,
        fontFamily:font,
        title:title,
        fontSize:size
    }}>
      
        {title}
        
    </div>
  )
}

export default Header