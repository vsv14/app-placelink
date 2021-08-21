import React, { useContext } from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export const Navbar = ()=>{
    const auth = useContext(AuthContext)
    const history = useHistory()


    function logoutHandler(event){
        event.preventDefault()
        auth.logout()
        history.push('/home')
    }


    return (
    <nav style={{minWidth: "800px", borderBottom:"2px solid #ebebeb"}}>
        <div className="nav-wrapper" style={{backgroundColor: '#ffffff', padding: '0 2rem'}}>
          <NavLink to="/links" className="brand-logo left bold" style={{margin: '0 1rem', color:'#000000'}}>PlaceLink</NavLink>
          <ul id="nav-mobile" className="right ">
            
            <li><NavLink to="/links" className="bold">Links</NavLink></li>
            <li><a href="/" className="bold undrln" onClick={logoutHandler}>logout</a></li>
          </ul>
        </div>
    </nav>
    )
}