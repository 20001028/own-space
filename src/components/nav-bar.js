import '../static/css/nav-bar.css';
import { Link } from 'react-router-dom';
import {NAV_ITEMS} from '../utils/const';
import React from 'react';

const NavBar=function(props){
    const navItems=NAV_ITEMS.map(item=>(
        <div className="nav-item" key={item.name}>
            <Link to={item.path}>{item.name}</Link>
        </div>
    ))
    return (
        <div className="nav-bar-container">
            <div className="app-logo">
                
            </div>
            <div className="nav-items">
                {navItems}
            </div>
            <div className="nav-others">

            </div>
        </div>
    );
};

export default NavBar;