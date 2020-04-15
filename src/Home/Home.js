import React from 'react';
import "./Home.css"
import HomeNavBar from '../elements/HomeNavBar/HomeNavBar';
import SearchBar from '../elements/SearchBar/SearchBar'



const Home = () => {
  return(

    <div className="container">
      <HomeNavBar />

      <div className="row">

        <div className="left col-md-6 col-xs-12">
        <br/>
      <br/>
      <br/>
            {/* SearchBar */}
            <SearchBar />
            {/* Welcome */}
            <div className="text-main">
                Welcome to <br /> Uni Connect
            </div>
        </div>
        <div className="right col-md-6">
          {/* Image */}
          <div className="img-home">
                <img src="images/home-image.png" alt="home"/>
            </div>
        </div>
      </div>

    </div>
  )
}
export default Home;
