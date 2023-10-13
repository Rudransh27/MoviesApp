import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Navbar extends Component {
  render() {
    return (
      <div style={{display:'flex', background:'#FFA500', padding:'0.5'}}>
        <Link to="/" style={{textDecoration:'none', color:'Black'}}><h1 style={{marginLeft:'1rem'}}>MovieS</h1></Link>
        <Link to="/favourites" style={{textDecoration:'none', color:'Black'}}><h2 style={{marginLeft:'2rem', marginTop:'0.4rem'}}>Favourites</h2></Link>
      </div>
      
    )
  }
}
