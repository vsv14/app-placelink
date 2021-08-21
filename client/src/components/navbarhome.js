import React from 'react'
import {NavLink} from 'react-router-dom'




export const HNavbar = ()=>{

    return (
      <nav style={{minWidth: "800px", borderBottom:"2px solid #ebebeb"}}>
          <div className="nav-wrapper" style={{backgroundColor: '#ffffff', padding: '0 2rem'}}>
            <NavLink to="/home" className="brand-logo left bold" style={{margin: '0 1rem', color:'#000000'}}>PlaceLink</NavLink>
            <ul id="nav-mobile" className="right ">
              <li><NavLink to="/signin" className="bold">Log in</NavLink></li>
              <li><NavLink to="/signup" className="bold undrln">Sign up Free</NavLink></li>
            </ul>
          </div>
      </nav>
    )
}