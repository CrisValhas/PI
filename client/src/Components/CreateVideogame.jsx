import React,{ useState,useEffect } from 'react';
import {postVideogame,getGenres} from '../Actions/index'
import { useDispatch, useSelector } from 'react-redux';
import Nav from './Nav';
import './Styles/CreateVideogames.css';

export function validate(input) {
  let errors = {};
  if (!input.username) {
    errors.username = 'Username is required';
  } else if (!/\S+@\S+\.\S+/.test(input.username)) {
    errors.username = 'Username is invalid';
  }
  if (!input.password) {
    errors.password = 'Password is required';
  } else if (!/(?=.*[0-9])/.test(input.password)) {
    errors.password = 'Password is invalid';
  }

  return errors;
};


export default function CreateVideogame() {

  let dispatch=useDispatch();
  useEffect (()=>{dispatch(getGenres())},[]);
  let genres =useSelector(state =>state.genres);


  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
  name: '',
  description: '',
  released:'',
  rating:'',
  Genres:'',
  platforms:'',
});

const handleclick= e =>{
  dispatch(postVideogame(input))

}

const handleSubmit = e => {
  e.preventDefault()
}
const handleInputChange = function(e) {
  setInput({
    ...input,
    [e.target.name]: e.target.value
  })
  setErrors(validate({
    ...input,
    [e.target.name]: e.target.value
    })
  );
}
  return (
    <div className='container'><Nav/>
    <h1>
        Add your videogame
      </h1>
    <div className='container'> 
      
      <form onSubmit={handleSubmit}>
      <div className='all'>
        <div className='form'>
          <label>Name </label>
            <input className={errors.name && 'danger'}
            type="text" name="name" onChange={handleInputChange} value={input.name} />
            {errors.name && (
              <p className="danger">{errors.name}</p>
            )}
        </div>
        <div className='form'>
          <label>Description </label>
            <input className={errors.description && 'danger'}
            type="description" name="description" onChange={handleInputChange} value={input.description} />
            {errors.description && (
              <p className="danger">{errors.description}</p>
            )}
        </div>
        <div className='form'>
          <label>released </label>
            <input className={errors.released && 'danger'}
            type="text" name="released" onChange={handleInputChange} value={input.released} />
            {errors.released && (
              <p className="danger">{errors.released}</p>
            )}
        </div>
        <div className='form'>
          <label>Rating </label>
            <input className={errors.rating && 'danger'}
            type="text" name="rating" onChange={handleInputChange} value={input.rating} />
            {errors.rating && (
              <p className="danger">{errors.rating}</p>
            )}
            <div className='form'>
            <label>Platforms </label>
              <select id="opciones" name="opciones">
                <option value= "PC" >PC</option>
                <option value= "PlayStation 5" >PlayStation 5</option>
                <option value= "PlayStation 4" >PlayStation 4</option>
                <option value= "PlayStation 3" >PlayStation 3</option>
                <option value= "PlayStation 2" >PlayStation 2</option>
                <option value= "PlayStation " >PlayStation </option>
                <option value= "Xbox Series S/X" >Xbox Series S/X</option>
                <option value= "box 360" >box 360</option>
                <option value= "Xbox One" >Xbox One</option>
                <option value= "Xbox" >Xbox</option>
                <option value= "Nintendo Wii" >Nintendo Wii</option>
                <option value= "Nintendo Switch" >Wii</option>
              </select>
            </div>
            <div className='form'>
            <label>Genres </label>
              <select id="opciones" name="opciones">{
                genres.length ?genres.map((genres,index) =>
                            (<option value={genres.name} key={index}>{genres.name}</option>)):<option>sin generos cargados</option>
                }
              </select>
            </div>
        </div>
        
      </div>
      <div className='form'>
      <button onClick={handleclick}>Create</button>

      </div>
        
      </form>
    </div>
    <img className='Himg' src ="https://blog.soyhenry.com/content/images/2021/02/HEADER-BLOG-NEGRO-01.jpg" alt=""></img>
    <div className='form'>enserio pensaste que podias crear un juego ?... para eso unite a Henry picaron...</div>
    </div>)
}
<div>
[ ] Un formulario controlado con JavaScript con los siguientes campos:
Nombre
Descripción
Fecha de lanzamiento
Rating
[ ] Posibilidad de seleccionar/agregar varios géneros
[ ] Posibilidad de seleccionar/agregar varias plataformas
[ ] Botón/Opción para crear un nuevo videojuego
Es requisito que el formulario de creación esté validado con JavaScript y no sólo con validaciones HTML.
Pueden agregar las validaciones que consideren. 
Por ejemplo: Que el nombre del juego no pueda contener algunos símbolos, que el rating no pueda exceder determinado valor, etc.
</div>

