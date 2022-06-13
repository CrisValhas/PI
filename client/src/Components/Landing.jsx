import {Link} from 'react-router-dom';
import"./Styles/Landing.css";
import React,{useEffect} from 'react';
import {getAllVideogames,getGenres} from '../Actions/index';
import {useDispatch} from 'react-redux';


export default function Landing()  {

        let dispatch = useDispatch();
        useEffect (()=>{dispatch(getAllVideogames())});
        useEffect (()=>{dispatch(getGenres())});

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