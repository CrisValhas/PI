import React, { useState, useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import Card from "./Card";
import {getVideogamesByName} from '../Actions/index';
import"./Styles/Home.css";
import Nav from './Nav';
import loading from '../Media/dmc.gif';
import {getAllVideogames,getGenres} from '../Actions/index';
import NavFilters from './NavFilters';


export default function Home()  {
        let allVideogames= useSelector(state => state.videogames)
        let dispatch = useDispatch();
        useEffect (()=>{dispatch(getAllVideogames())},[allVideogames]);
        // useEffect (()=>{dispatch(getGenres())},[]);
        let [search, setSearch] = useState();
        
        function handleOnchange(e){
                e.preventDefault()
                setSearch({
                        search:e.target.value
                })
        }

        function handleSubmit (e){
                e.preventDefault();
                dispatch(getVideogamesByName(search));
                setSearch('');
        }
                return (
                        allVideogames.length ?     
                        <div className="searchbar">
                                <Nav/>
                        <div>
                        <div className='searchbar'> 
                        <form onSubmit={(e)=>handleSubmit(e)}>
                                <input className= "input"
                                type="text"
                                placeholder="Search by name..."
                                required
                                onChange={(e)=>handleOnchange(e)}
                                />
                                <button className= "sbtn">Search</button>
                        </form >
                        </div>
                        <div>
                                <NavFilters/>
                        </div>
                                <div className='Gview'>
                                {allVideogames.map((e, index) => (
                                        <div key={index} >
                                        <Card 
                                        id = {e.id}
                                        name={e.name} 
                                        image={e.image} 
                                        genres={e.genres? e.genres.map((e, index) => 
                                        (<p key={index} className="genres">{e}</p>)) : <div>Sin genero asignado</div>}
                                        />
                                </div> ))}</div> 
                        </div>
                        </div>: <div className='dmg'><img  src={loading} alt="" />
                                        <p className="loading">Loading...</p>
                                </div>
                                
                        
                )
        
};
