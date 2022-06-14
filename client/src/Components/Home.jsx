import React, { useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import Card from "./Card";
import {getVideogamesByName,getAllVideogames,orderByName,orderByRating,filterByGenre,filterByDborApi} from '../Actions/index';
import"./Styles/Home.css";
import Nav from './Nav';
import loading from '../Media/dmc.gif';
import Pagin from './Pagin';

export default function Home()  {

        let dispatch = useDispatch();
        let [pagin,setPagin]= useState();
        pagin= useSelector(state => state.videogames);
        const [currentPage, setCurrentPage] = useState(1);
        const [videogamesPerPage] = useState(15);
        const indexOfLastVideogame = currentPage * videogamesPerPage; 
        const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage 
        const currentVideogames = pagin.slice(indexOfFirstVideogame, indexOfLastVideogame);
        const [order, setOrder] = useState("");
        const lastPage = Math.ceil(pagin.length / 15)
        const [search, setSearch] = useState();
        let genres =useSelector(state =>state.genres);


        const paginado = (pageNumber) => {setCurrentPage(pageNumber)}
        const handlePrevNext = e => {
                e.preventDefault();
                switch (e.target.name) {
                        case "prev":
                                if (currentPage - 1 !== 0) {
                                paginado(currentPage - 1);
                                };
                                break;
                        case "next":
                                if (currentPage + 1 <= lastPage) {
                                paginado(currentPage + 1);
                                };
                                break;
                        default:
                        break;
                }
        }
        function handleClick(e) {
                e.preventDefault();
                dispatch(getAllVideogames());
                setCurrentPage(1);
        }
        
        function handleSortName(e){
                e.preventDefault();
                // if(e.target.value){
                        dispatch(orderByName(e.target.value));
                        setCurrentPage(1);
                        setOrder(`Order ${e.target.value}`)
                        //document.getElementById(opciones).value "order by name" set defalt
                        
                // }else{
                //         handleClick(e);
                        // setOrder(`Order ${e.target.value}`)
                // }
        }
        
        function handleSortRating(e){
                e.preventDefault();
                dispatch(orderByRating(e.target.value));
                setCurrentPage(1);
                setOrder(`Order ${e.target.value}`)
        }
        
        function handleFilterGenres(e){
                e.preventDefault();
                setCurrentPage(1);
                dispatch(filterByGenre(e.target.value));
        }
        
        function handleFilterDbApi(e){
                e.preventDefault();
                setCurrentPage(1);
                dispatch(filterByDborApi(e.target.value));
        }
        function handleOnchange(e){
                e.preventDefault();
                setSearch({search:e.target.value});
        }

        function handleSubmit (e){
                e.preventDefault();
                dispatch(getVideogamesByName(search));
                setSearch('');
        }

        return (
                (currentVideogames.length > 0) ?     
                <div className="searchbar">
                                <Nav/>
                        <div>
                        <div className='searchbar'> 
                                <form onSubmit={(e)=>handleSubmit(e)}>
                                        <input className= "input"
                                        type="text"
                                        placeholder="Search by name..."
                                        required
                                        onChange={(e)=>handleOnchange(e)}/>
                                <button className= "sbtn">Search</button>
                                </form >
                        </div>
                        
                        <div>
                                <div className='Filters'>
                                        <div>
                                                <button className= "sbtn" onClick={e => handleClick(e)}>Cleaning</button>
                                        </div>
                                        <div className='stick'>
                                                <label >Genres </label>
                                                <select id="opciones" onChange={e => handleFilterGenres(e)}>
                                                        <option disabled value={null} key="n">{null}</option>{
                                                        genres.length ?genres.map((genres,index) =>
                                                        (<option value={genres.name} key={index}>{genres.name}</option>)):<option>sin generos cargados</option>
                                                        }
                                                </select>
                                        </div>
                                        <div className='stick'>
                                                <label>Source </label>
                                                <select id="opciones" onChange={e => handleFilterDbApi(e)}>
                                                        <option disabled value={null} key="n">{null}</option>
                                                        <option value= "Api" >Api</option>
                                                        <option value= "Data Base" >Data Base</option>
                                                </select>
                                        </div>
                                        <div className='stick'>
                                                <label>Order By Name </label>
                                                <select defaultValue="order by name" id="opciones" onChange={e => handleSortName(e)}>
                                                        <option disabled value="order by name" key="n">order by name</option>
                                                        <option value= "A-Z" >A-Z</option>
                                                        <option value= "Z-A" >Z-A</option>
                                                </select>
                                        </div>
                                        <div className='stick'>
                                                <label>Order By rating </label>
                                                <select id="opciones" onChange={e => handleSortRating(e)}>
                                                        <option disabled value={null} key="n">{null}</option>
                                                        <option value= "Ascending" >Ascending</option>
                                                        <option value= "Descending" >Descending</option>
                                                </select>
                                        </div>
                                </div>
                        </div>
                        
                        <div className='Gview'>
                                {currentVideogames.map((e, index) => (
                                        <div key={index} >
                                                <Card 
                                                id = {e.id}
                                                name={e.name} 
                                                image={e.image} 
                                                genres={e.genres? e.genres.map((e, index) => 
                                                        (<p key={index} className="genres">{e}</p>)) : <div></div>}
                                                
                                                Genre={e.Genres? e.Genres.map((genre, index) => 
                                                        (<p key={index} className="genres">{genre.name}</p>)):<div></div>}
                                                />
                                        </div> ))}
                        </div> 
                                <Pagin 
                                        videogamesPerPage={videogamesPerPage}
                                        videogames={pagin.length}
                                        paginado={paginado}
                                        handlePrevNext={handlePrevNext}
                                />
                        </div>
                </div>: <div className='dmg'><img  src={loading} alt="" />
                                <p className="loading">Loading...</p>
                        </div>
                )
};
