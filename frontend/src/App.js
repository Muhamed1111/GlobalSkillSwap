import React from 'react'
import Header from './components/Header'
import Sidebar from './components/sidebar'

const App = () => {
  return (
    <div className='app'>
      <Header title={"Global Skill Swap"} font={"italic"} size={"3rem"} color={"green"}/>
      <Sidebar
        active={true}
          
      />
        
      
      <nav style={{padding:"10px",margin: "10px", alignItems:"center",justifyContent:"space-between", gap:"20px"}}>
        <div>
        <a href="/home">Home</a>
        </div>
        <a href="/how">How it works</a>
        <div>
        <a href="/about">about</a>
        </div>
        <br/>
        <a href="/skils">skills</a>
        <br/>
        <a href="/post">Post</a>
        <br/>
        <button type='button'>
         <a href='/sign_in'>Sign In</a>
        </button>
        <br/>
        <a href='/profile'>Profile</a>
      </nav>
    </div>
  )
}

export default App