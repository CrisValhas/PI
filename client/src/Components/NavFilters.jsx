import { useSelector } from 'react-redux';
import React,{ useState,useEffect,useDispatch } from 'react';
import { getGenres } from '../Actions';
import "./Styles/NavFilters.css"


    
    export default function NavFilters(){
    
        // let dispatch=useDispatch();
        // useEffect (()=>{dispatch(getGenres())});
        let genres =useSelector(state =>state.genres);

    return(
        <div className='Filters'>
        <div className='stick'>
        <label >Genres </label>
            <select id="opciones" name="opciones">{
                genres.length ?genres.map((genres,index) =>
                (<option value={genres.name} key={index}>{genres.name}</option>)):<option>sin generos cargados</option>
                }
            </select>
        </div>

        <div className='stick'>
            <label>Source </label>
            <select id="opciones" name="opciones">
                <option value= "Api" >Api</option>
                <option value= "Data Base" >Data Base</option>
            </select>
        </div>
        <div className='stick'>
            <label>Order By Name </label>
            <select id="opciones" name="opciones">
                <option value= "A-Z" >A-Z</option>
                <option value= "Z-A" >Z-A</option>
            </select>
        </div>
        <div className='stick'>
            <label>Order By rating </label>
            <select id="opciones" name="opciones">
                <option value= "Ascending" >Ascending</option>
                <option value= "Descending" >Descending</option>
            </select>
        </div>

        </div>
    )};
    