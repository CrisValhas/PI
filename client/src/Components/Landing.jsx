import {Link} from 'react-router-dom';
import"./Styles/Landing.css";
import React from 'react';


export default function Landing()  {


        return (
        <div className="landing">
        <div className="bg">
                <Link to="/home" style={{ textDecoration: "none" }}>
                <img className="landingImg" alt=""></img> 
                </Link>
                
        </div>
        </div>
);
}