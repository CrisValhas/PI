import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import {getVideogamesByName,orderByName,orderByRating,filterByGenre,filterByDborApi, clearCache, getAllVideogames} from "../Actions/index";
import "./Styles/Home.css";
import Nav from "./Nav";
import loading from "../Media/dmc.gif";
import Pagin from "./Pagin";

export default function Home() {

        const dispatch = useDispatch();
        let pagin =useSelector((state) => state.videogames);
        let load = useSelector((state)=> state.loading);
        const [state, setState] = useState({
                order:[],
                search:"",
        });
        const [currentPage, setCurrentPage] = useState(1);
        const [videogamesPerPage] = useState(15);
        const indexOfLastVideogame = currentPage * videogamesPerPage;
        const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
        const currentVideogames = pagin.slice(indexOfFirstVideogame,indexOfLastVideogame);
        const lastPage = Math.ceil(pagin.length / 15);
        const genres = useSelector((state) => state.genres);

        function paginado(pageNumber) {
                setCurrentPage(pageNumber);
        };
        function handlePrevNext(e) {
                e.preventDefault(e);
                switch (e.target.name) {
                        case "prev":
                                if (currentPage - 1 !== 0) {
                                        paginado(currentPage - 1);
                                }
                                break;
                        case "next":
                                if (currentPage + 1 <= lastPage) {
                                        paginado(currentPage + 1);
                                }
                                break;
                        default:
                                break;
                }
        };
        function handleClick(e) {
                e.preventDefault(e);
                dispatch(clearCache());
                dispatch(getAllVideogames());
                setCurrentPage(1);
                document.getElementById('OrderByName').removeAttribute("disabled");
                document.getElementById('OrderByrating').removeAttribute("disabled");
                document.getElementById('Genres').removeAttribute("disabled");
                document.getElementById('Source').removeAttribute("disabled");
                document.getElementById('Search').value="";
                        setState({
                                ...state,
                                order: [],
                        });
        };
        function handleSortName(e) {
                e.preventDefault(e);
                dispatch(orderByName(e.target.value));
                setCurrentPage(1);
                if (state.order.length <= 10) {
                        if (!state.order.includes(e.target.value)) {
                                setState({
                                        ...state,
                                        order: [...state.order, e.target.value]
                                });
                        };
                };
                document.getElementById('OrderByName').value="OrderByName";
                document.getElementById('OrderByName').setAttribute("disabled","disabled");
        };
        function handleSortRating(e) {
                e.preventDefault(e);
                dispatch(orderByRating(e.target.value));
                setCurrentPage(1);
                if (!state.order.includes(e.target.value)) {

                        setState({
                                ...state,
                                order: [...state.order, e.target.value]
                        });
                };
                document.getElementById('OrderByrating').value="OrderByrating";
                document.getElementById('OrderByrating').setAttribute("disabled","disabled");
        };
        function handleFilterGenres(e) {
                e.preventDefault(e);
                setCurrentPage(1);
                dispatch(filterByGenre(e.target.value));
                if (!state.order.includes(e.target.value)) {
                        setState({
                                ...state,
                                order: [...state.order, e.target.value]
                        });
                };
                document.getElementById('Genres').value="Genres";
                // document.getElementById('Genres').setAttribute("disabled","disabled");// me gusta mas el resultado aunque sea solo 1 genero
        };
        function handleFilterDbApi(e) {
                e.preventDefault(e);
                setCurrentPage(1);
                dispatch(filterByDborApi(e.target.value));
                if (!state.order.includes(e.target.value)) {
                        setState({
                                ...state,
                                order: [...state.order, e.target.value]
                        });
                };
                document.getElementById('Source').value="Source";
                document.getElementById('Source').setAttribute("disabled","disabled");
        };
        function handleOnchange(e) {
                e.preventDefault(e);
                setState({ 
                        ...state,
                        search: e.target.value });
        };
        function handleSubmit(e) {
                e.preventDefault(e);
                dispatch(clearCache());
                dispatch(getVideogamesByName(state.search));
                setState({ 
                        ...state,
                        search: "",
                });       
        };

        return (load === false ? pagin === "Searching"? <div className="dmg"><img src={loading} alt="" /><p className="loading">Performing actions... please wait</p></div> 
        :
                <div className="searchbar">
                        <Nav />
                        <div>
                                <div className="searchbar">
                                        <form   defaultValue="Search by name..." onSubmit={(e) => handleSubmit(e)}>
                                                <input
                                                        id="Search"
                                                        className="input"
                                                        type="text"
                                                        placeholder="Search by name..."
                                                        required
                                                        onChange={(e) => handleOnchange(e)}
                                                />
                                                <button className="sbtn">Search</button>
                                        </form>
                                </div>
                                <div>
                                        <div className="Filters">
                                                <div>
                                                        <button className="sbtn" onClick={(e) => handleClick(e)}>
                                                                Reset
                                                        </button>
                                                </div>
                                                <div className="stick">
                                                        <label>Genres </label>
                                                        <select defaultValue='disabled' 
                                                                id="Genres" 
                                                                onChange={(e) => handleFilterGenres(e)}
                                                        >
                                                                <option disabled value="disabled" key="n">
                                                                        {null}
                                                                </option>
                                                                {genres.length ? (
                                                                        genres.map((genres, index) => (
                                                                                <option value={genres.name} key={index}>
                                                                                        {genres.name}
                                                                                </option>
                                                                        ))
                                                                ) : (
                                                                        <option>sin generos cargados</option>
                                                                )}
                                                        </select>
                                                </div>
                                                <div className="stick">
                                                        <label>Source </label>
                                                        <select 
                                                                defaultValue='disabled'
                                                                id="Source" 
                                                                onChange={(e) => handleFilterDbApi(e)}>
                                                                <option disabled value='disabled' key="n">
                                                                        {null}
                                                                </option>
                                                                <option value="Api">Api</option>
                                                                <option value="DB">Data Base</option>
                                                        </select>
                                                </div>
                                                <div className="stick">
                                                        <label>Order By Name </label>
                                                        <select
                                                                defaultValue='disabled'
                                                                id ="OrderByName"
                                                                onChange={(e) => handleSortName(e)}>
                                                                <option disabled value="disabled" key="n">
                                                                        {null}
                                                                </option>
                                                                <option value="A-Z">A-Z</option>
                                                                <option value="Z-A">Z-A</option>
                                                        </select>
                                                </div>
                                                <div className="stick">
                                                        <label>Order By rating </label>
                                                        <select 
                                                        id="OrderByrating" 
                                                        defaultValue='disabled' 
                                                        onChange={(e) => handleSortRating(e)}
                                                        >
                                                                <option disabled value= 'disabled' key="n">
                                                                        {null}
                                                                </option>
                                                                <option value="Ascending">Ascending</option>
                                                                <option value="Descending">Descending</option>
                                                        </select>
                                                </div>                                               
                                        </div>
                                        <div >
                                                <div >
                                                        <div className="order">
                                                                {
                                                                        state.order.length ?
                                                                state.order.map((o, index) => 
                                                                        <div className="added" key={index}>
                                                                                {o}
                                                                        </div>
                                                                ):<div></div>}
                                                        </div>
                                                </div>       
                                        </div>
                                </div>
                                <div className="Gview">
                                        {currentVideogames.map((e, index) => (
                                                <div key={index}>
                                                        <Card
                                                                id={e.id}
                                                                name={e.name}
                                                                image={e.image}
                                                                genres={
                                                                        e.genres ? (
                                                                                e.genres.map((e, index) => (
                                                                                        (e.name)?
                                                                                        <p key={index} className="genres">
                                                                                                {e.name}
                                                                                        </p>
                                                                                        :
                                                                                        <p key={index} className="genres">
                                                                                                {e}
                                                                                        </p>
                                                                                ))
                                                                        ) : (
                                                                                <div>without assigned gender</div>
                                                                        )
                                                                }
                                                        />
                                                </div>
                                        ))}
                                </div>
                                <Pagin
                                        videogamesPerPage={videogamesPerPage}
                                        videogames={pagin.length}
                                        paginado={paginado}
                                        handlePrevNext={handlePrevNext}
                                />
                        </div>
                </div>
        : state.order< 1? 
                <div className="dmg">
                        <img src={loading} alt="" />
                        <p className="loading">Loading...</p>
                </div> : <div className="dmg">
                                <h3 >Ups!!!... no video games with selected filters. Please 
                                        Go back
                                </h3>
                                <img src={loading} alt="" /> 
                </div>
        );
}