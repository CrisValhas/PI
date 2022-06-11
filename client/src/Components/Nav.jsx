import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../Media/LOGO_HENRY.png';
import "./Styles/Nav.css";

export default function Nav() {
    
    return (
        <header className="navbar">
        <div>
        <Link to="/" >
            <img id="logoHenry" src={logo} width="80" height="80" className="logo" alt="" />
        </Link>    
            </div>
            <nav>
                <ul className="list">
                    <li className="list-item">
                        <Link to="/Home" >
                            Home 
                        </Link>    
                    </li>
                    <li className="list-item">
                        <Link to="/videogame" >
                            Create Videogames
                        </Link>  
                    </li>
                </ul>
            </nav>
    </header>
)
}
