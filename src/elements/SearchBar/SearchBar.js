import React from 'react';
import Fontawesome from 'react-fontawesome';
import './SearchBar.css'; 



const SearchBar = () => {
    return(
        <div className="search">
        <Fontawesome className='fas fa-search'></Fontawesome>
        <input className="search-input"
               type="text"
               placeholder="Search Degree, Department or Faculty"
        />
        </div>
    )
} 

export default SearchBar;