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
    errors.description = "A name is too long"
  }
  if (!input.description) {
    errors.description = "A description is required"
  }
  if (input.description.length > 255){
    errors.description = "A description is too long, only 255 characters"
  }
  if (input.rating > 5) {
    errors.rating = "The rating is up to 5"
  }
  if (input.released.length < 10) {
    errors.released = "A released is required"
  }
  if (input.platforms.length < 1) {
    errors.platforms = "A platforms is required"
  }
  // if (input.genres.length < 1) {
  //   errors.genres = "A genres is required" // no entiendo el error!!!! me rompe todo el form
  // }
  // if (input.name.length >0 && input.description.length >0 && input.released.length >0 && input.rating.length >0 && input.genre.length >0 && input.platforms.length >0){
  //   alert("Video game created successfully!");
  //   document.getElementById('created').setAttribute("disabled","disabled");
  // }
  // document.getElementById('created').removeAttribute("disabled"); //input type submit // clase camilo 24b forms
  return errors
}

export default function CreateVideogame() {

  let dispatch = useDispatch();
  useEffect(() => { dispatch(getGenres()) }, []);
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
  const clickSucess =(e) =>{
    if (errors.length>0){
      alert("Video game created successfully!")// no me funciona 
    }

  };
  const handleclick = (e) => {
    e.preventDefault()
    dispatch(postVideogame(input))


  };
  const handlepush = (e) => {
    if (e.target.name === "genre") {
      if (input.genre.length < 3) {
        if (!input.genre.includes(e.target.name))
          setInput({
            ...input,
            [e.target.name]: [...input[e.target.name], e.target.value]
          })
      }
    }
    if (e.target.name === "platforms") {
      if (input.platforms.length < 6) {
        if (!input.platforms.includes(e.target.name))
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
              <input className={errors.name && 'danger'}
                type="text" name="name" value={input.name} onChange={(e) => handleInputChange(e)} />
              {errors.name && (
                <p className="danger">{errors.name}</p>
              )}
            </div>
            <div className='form'>
              <label>released </label>
              <input className={errors.released && 'danger'}
                type="date"
                name="released" value={input.released} onChange={(e) => handleInputChange(e)} />
              {errors.released && (
                <p className="danger">{errors.released}</p>
              )}
            </div>
            <div className='form'>
              <label>Rating </label>
              <input className={errors.rating && 'danger'}
                type="number" name="rating" value={input.rating} onChange={(e) => handleInputChange(e)} />
              {errors.rating && (
                <p className="danger">{errors.rating}</p>
              )}
              <div className='form'>
                <label>Platforms </label>
                <select className={errors.platforms && 'danger'} name="platforms" onChange={(e) => handlepush(e)}>
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
                <label>Genres </label>
                <select className={errors.rating && 'danger'} id="opciones" name="genre" onChange={(e) => handlepush(e)}>{
                  genres.length ? genres.map((genres, index) =>
                    (<option value={genres.name} key={index}>{genres.name}</option>)) : <option>sin generos cargados</option>
                }
                </select>
                {errors.genres && (
                <p className="danger">{errors.genres}</p>)}
              </div>
              <div className='form'>
                <label>Description </label>
                <input className='description'
                  type="description" name="description" value={input.description} onChange={(e) => handleInputChange(e)} />
                {errors.description && (
                  <p className="danger">{errors.description}</p>
                )}
              </div>
            </div>
          </div>
          <div className='form'>
            <button id="created">Create</button>
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

