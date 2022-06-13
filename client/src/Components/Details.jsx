import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import Nav from './Nav';
import { getDetails } from '../Actions';
import { useParams } from 'react-router-dom';
import"./Styles/Details.css";

export default function Details() {
    let id=useParams("id");
    let dispatch = useDispatch();
        useEffect (()=>{dispatch(getDetails(id))});
        let details= useSelector(state => state.details);
                return (  // details.length === 1 ?  
<div className="back">
    <div>
        <Nav/>
        <div  >
            <div>
                <div>
                    <img className="fullimg" src={details.image}  alt="" />
                        <div className="title">
                            <p >{details.name} </p>
                        </div>
                </div>         
                        Genres
                        <div className="gen">{
                                details.genres? details.genres.map((details, index) => 
                                (<p key={index} className="gen">{details}</p>))
                                : <div>Sin genero asignado</div>}
                        </div>
                        Platforms
                        <div className="gen">{
                                details.platforms? details.platforms.map((details,index) =>
                                (<p key={index} className="platforms">{details}</p>))
                                : <div>Sin plataformas asignadas</div>}
                        </div>
                        <div className ="gen">
                            {details.description}
                        </div>
                        <div className ="gen">
                            Rating {details.rating}
                        </div>
                        <div className ="gen">
                            released {details.released}
                        </div> 
                    
            </div>
        </div>
    </div>
</div> 
//                                 : <div className='dmg'><img  src={loading} alt="" />
//                                         <p className="loading">Loading...</p>
//                                 </div>
)};