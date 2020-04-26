import React from 'react';
import './SearchBar.css'; 



const SearchBar = () => {
    return(
     
        <div className="search">
        <i className="fas fa-search"></i>
        <input className="search-input"
               type="text"
               placeholder="Search Degree, Department or Faculty"
        />
        </div>
    )
} 

export default SearchBar;