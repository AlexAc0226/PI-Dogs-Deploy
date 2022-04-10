import React from 'react'
import "./Home.css";
import Paginate from '../Paginator/Paginate.js'
import Navbar from '../Navbar/Navbar.js'

function Home() {
  return (
    <div className="container-home">
      <div className="container-home-paginate">
          <div className="container-home-paginate-navbar">
            <Navbar />
          </div>
          <div className="container-home-paginate-paginate">
            <Paginate />
          </div>
      </div>
    </div>
  )
}

export default Home