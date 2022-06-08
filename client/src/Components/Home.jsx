import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllVideogames , filterByDborApi , filterByGenre , orderByName, orderByRating } from "../Actions";
import { useState, useEffect,useSelector,useDispatch } from "react";
import { Link } from "react-router-dom";
import Card from "./Card"


export default function Home() {
        const dispatch = useDispatch();
        const videogames = useSelector(state => state.allvideogames);
        console.log(videogames)

        useEffect(() => {
        dispatch(getAllVideogames())
        }, [dispatch]) 

        // function handleClick(e) {
        //         e.preventDefault();
        //         dispatch(getAllVideogames());
        return (
                <div>
                        {videogames.map((e, index) => (
                                <div key={index}>
                                        <Link to={"/videogame/" + e.id}>
                                        <Card
                                                name={e.name}
                                                image={e.image}
                                                genres={e.createdInDb ?
                                                e.genres.map((s, index) => (<li key={index}>{s.name}</li>)) :
                                                e.genres.map((s, index) => (<li key={index}>{s}</li>))} />
                                        </Link>
                                </div>
                        ))}
                </div>
        )


// Input de búsqueda para encontrar videojuegos por nombre
// Área donde se verá el listado de videojuegos. Deberá mostrar su:
// Imagen
// Nombre
// Géneros
// Botones/Opciones para filtrar por género y por videojuego existente o agregado por nosotros
// Botones/Opciones para ordenar tanto ascendentemente como descendentemente los videojuegos por orden alfabético y por rating
// Paginado para ir buscando y mostrando los siguientes videojuegos, 15 juegos por pagina, mostrando los primeros 15 en la primer pagina.
// IMPORTANTE: Dentro de la Ruta Principal se deben mostrar tanto los videjuegos traidos desde la API como así también los de la base de datos.
// Debido a que en la API existen alrededor de 500 mil juegos, por cuestiones de performance pueden tomar la simplificación de obtener y paginar los 
// primeras 100.
}
