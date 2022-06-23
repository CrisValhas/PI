import React, { useState, useEffect } from 'react';
import { postVideogame, getGenres } from '../Actions/index'
import { useDispatch, useSelector } from 'react-redux';
import Nav from './Nav';
import './Styles/CreateVideogames.css';

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "A name is required"
  }
  if (input.name.length > 30){
    errors.name = "A name is too long"
  }
  if (!input.description) {
    errors.description = "A description is required"
  }
  if (input.description.length > 255){
    errors.description = "A description is too long, only 255 characters"
  }
  if (input.rating > 5 || input.rating <1) {
    errors.rating = "The rating is up to 5"
  }
  if (input.released.length < 10) {
    errors.released = "A released is required"
  }

  return errors
}

export default function CreateVideogame() {

  let dispatch = useDispatch();
  useEffect(() => { dispatch(getGenres()) }, [dispatch]);
  let genres = useSelector(state => state.genres);

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    description: "",
    image: "",
    released: "",
    rating: "",
    genre: [],
    platforms: [],
  });
  const handleclick = (e) => {
    e.preventDefault(e)
    if (!input.name||!input.description||!input.released||!input.rating||input.genre.length<1||input.platforms.length<1) alert("some empty value")
    else{
      dispatch(postVideogame(input)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             )
      document.getElementById("released").value=""
      document.getElementById("rating").value=""
      document.getElementById("platforms").value=""
      document.getElementById("description").value=""
      document.getElementById("opciones").value=""
      document.getElementById("name").value=""
      setInput({
        ...input,
          name: "",
          description: "",
          image: "",
          released: "",
          rating: "",
          genre: [],
          platforms: [],
      })
    } 
  };
  const handlepush = (e) => {
    
    if (e.target.name === "genre") {
      if (input.genre.length < 3) {
        if (!input.genre.includes(e.target.value))
          setInput({
            ...input,
            [e.target.name]: [...input[e.target.name], e.target.value]
          })
      }
    }
    if (e.target.name === "platforms") {
      if (input.platforms.length < 6) {
        if (!input.platforms.includes(e.target.value))
          setInput({
            ...input,
            [e.target.name]: [...input[e.target.name], e.target.value]
          })
      }
    }
  };
  const handleDelete = (e) => {
    e.preventDefault(e);
    setInput({
      ...input,
      [e.target.name]: input[e.target.name].filter(t => t !== e.target.value)
    });
  };
  const handleInputChange =(e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  };

  return (
    <div className='container'><Nav />
      <h1 className='h1'>Add your videogame</h1>
      <div className='container'>
        <form onSubmit={(e) => handleclick(e)}>
          <div className='all'>
            <div className='form'>
              <label>Name </label>
              <input className={errors.name && 'danger'} id="name"
                type="text" name="name" value={input.name} onChange={(e) => handleInputChange(e)} />
              {errors.name && (
                <p className="danger">{errors.name}</p>
              )}
            </div>
            <div className='form'>
{/*-------------------------------------------------------------- RELEASED --------------------------------------------------------------*/}
              <label>released </label>
              <input id="released" className={errors.released && 'danger'}
                type="date"
                name="released" value={input.released} onChange={(e) => handleInputChange(e)} />
              {errors.released && (
                <p className="danger">{errors.released}</p>
              )}
            </div>
            <div className='form'>
{/*-------------------------------------------------------------- RATING-------------------------------------------------------------- */}
              <label>Rating </label>
              <input id="rating" className={errors.rating && 'danger'}
                type="number" name="rating" value={input.rating} onChange={(e) => handleInputChange(e)} />
              {errors.rating && (
                <p className="danger">{errors.rating}</p>
              )}
              <div className='form'>
{/*-------------------------------------------------------------- PLATFORMS --------------------------------------------------------------*/}
                <label>Platforms </label>
                <select defaultValue= "select"  id="platforms" className={errors.platforms && 'danger'} name="platforms" onChange={(e) => handlepush(e)}>
                  <option value="PC" >PC</option>
                  <option value="PlayStation 5" >PlayStation 5</option>
                  <option value="PlayStation 4" >PlayStation 4</option>
                  <option value="PlayStation 3" >PlayStation 3</option>
                  <option value="PlayStation 2" >PlayStation 2</option>
                  <option value="PlayStation " >PlayStation </option>
                  <option value="Xbox Series S/X" >Xbox Series S/X</option>
                  <option value="box 360" >box 360</option>
                  <option value="Xbox One" >Xbox One</option>
                  <option value="Xbox" >Xbox</option>
                  <option value="Nintendo Wii" >Nintendo Wii</option>
                  <option value="Nintendo Switch" >Wii</option>
                </select>
                {errors.platforms && (
                <p className="danger">{errors.platforms}</p>)}
              </div>
              <div className='form'>
{/*---------------------------------------------------------- GENRES --------------------------------------------------------------*/}
                <label>Genres </label>
                <select className={errors.genres && 'danger'} id="opciones" name="genre" onChange={(e) => handlepush(e)}>{
                  genres.length ? genres.map((genres, index) =>
                    (<option value={genres.name} key={index}>{genres.name}</option>)) : <option>sin generos cargados</option>
                }
                </select>
                {errors.genres && (
                <p className="danger">{errors.genres}</p>)}
              </div>
              <div className='form'>
{/*---------------------------------------------------------- DESCRIPTION --------------------------------------------------------------*/}
                <label>Description </label>
                <input id="description" className= "description"
                  type="description" name="description" value={input.description} onChange={(e) => handleInputChange(e)} />
                {errors.description && (
                  <p className="danger">{errors.description}</p>
                )}
              </div>
            </div>
          </div>
          <div className='form'>
            <button className="sbtn" id="created">Create</button>
          </div>
        </form>
      </div>
      <div >
        <div className="content">
          {input.platforms.length ? <h4>platforms added</h4> : <></>}
          {input.platforms.length ?
            input.platforms.map((o, index) =>
              <div className="added" key={index}>
                <button key={index} name="platforms" value={o} onClick={(e) => handleDelete(e)} className='btn'>X</button>
                {o}
              </div>
            ) : <h4>without added platforms</h4>}
          {input.platforms.length ? <h4>Genres added</h4> : <></>}
          {input.genre.length ?
            input.genre.map((o, index) =>
              <div className="added" key={index}>
                <button key={index} name="genre" value={o} onClick={(e) => handleDelete(e)} className='btn'>X</button>
                {o}
              </div>
            ) : <h4>without added genres</h4>}
        </div>
      </div>
    </div>)
};

