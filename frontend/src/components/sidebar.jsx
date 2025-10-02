import React from 'react'
import Header from './Header'
import menu from '../asserts/images/menu.png';
import Image from './Image';
import Button from "./Button"
const Sidebar = ({active}) => {
  return (
    <div>
        
        <Header title={"Menu"}/>
        <Button>
            <Image size="20px" src={menu} alt="Kuca"/>
        </Button>
        
        

        </div>
  )
}

export default Sidebar