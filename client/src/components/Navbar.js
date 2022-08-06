import React, { Component } from 'react'; // React is the default export of the base react file. Component is not a default export, so we have to add {} around it
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css' // This css had to be imported manually so we could style our navbar

export default function Navbar ({ currentUser, logMeOut }) { // You can only have one "default" export (which is the main thing that the module exports). When importing in another file, if the thing you are trying to export is not the default, you have to put it in {}. If it's the default, you don't need the {} when importing
  
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    console.log(`searching for ${event.target[0].value}`)
    navigate(`/search/${event.target[0].value}`)
    window.location.reload(false)
  }


  // render() { <--Render is only needed in React Class Components, and we converted Navbar.js into a React Function Component in Week-9-day-1
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light my-nav">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">KikiCooks</a> {/* when we copied the bootstrap navbar code, it had href="#" which is not valid in JSX, so we had to change it to "/" */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/favorites">Favorites</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
              
              <li>
              <Link className="nav-link" to='/post/create'>Create</Link>
              </li>
              {currentUser.username ? // syntax for if statements in JSX -> condition ? resultIfTrue : resultIfFalse
                <li className="nav-item" onClick={()=>logMeOut()}> 
                  <Link className="nav-link" to="/login">Log Out</Link>
                </li>
                :
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                  </li>
                </>
              }
              <li className="nav-item">
                <a className="nav-link">:</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={'/user-posts/' + currentUser.username} aria-disabled="true">{currentUser.username}</a>
              </li>
            </ul>
            {/* <form onSubmit={(e)=>searchBarQuery(e)} id='search_form' className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search a food or user" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button> */}
              <form onSubmit={(e)=>handleSubmit(e)} id='search_form' className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search a food or user" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    )
}
