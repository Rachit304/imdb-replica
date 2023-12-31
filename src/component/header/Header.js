import React from 'react'

import './Header.css'

import { Link } from 'react-router-dom';

import SearchBar from './Searchbar';

 

const Header = () => {




   

    // Do something with the movies data, e.g., update state or display the results




  return (

    <div className='header'>

        <div className='headerLeft'>

         

            <Link className="link" to="/"><img className='header__icon' alt="" src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png'/></Link>

            <Link className="link" to="/movies/popular"><span>Popular</span></Link>

            <Link className="link" to="/movies/top_rated"><span className='top'>Top Rated</span></Link>

            <Link className="link" to="/movies/upcoming"><span>Upcoming</span></Link>




            {/* Searchbar */}

            {/* <div className="input-group searchbar">

              <input type="text" className="form-control" placeholder="Search this blog" />

              <div className="input-group-append">

                <button className="btn btn-secondary" type="button">

                <i className="fa fa-search"></i>

                </button>

                <br></br>

              </div>

            </div> */}

            <SearchBar  />

           

        </div>

       

    </div>

  )

}




export default Header