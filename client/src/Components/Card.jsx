import React from "react";
import "./Styles/Card.css"
import { Link } from "react-router-dom";


export default function Card({ image, name, genres, id }) {

    return (
        <div className="card" >
            <div className="row">
                <div>
                    <img className="src" src={image} alt="" />
                    <div>
                        <div className="name">
                            <p >{name}</p>
                        </div>
                        <div className="genres">{genres}</div>
                    </div>
                    <div className="details">
                        <Link to={"/videogame/" + id} >
                            <p >More info</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
};
