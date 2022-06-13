import React,{ useState,useEffect } from 'react';
import {postVideogame,getGenres} from '../Actions/index'
import { useDispatch, useSelector } from 'react-redux';
import Nav from './Nav';
import './Styles/CreateVideogames.css';

function validate(input) {
  let errors = {};
  if (!input.name) {
      errors.name = "A name is required"
  }
  if (!input.description) {
      errors.description = "A description is required"
  }
  if (input.rating > 5) {
      errors.rating = "The rating is up to 5"
  }
  return errors
  //validate fecha
  // /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[1-9]|2[1-9])$/
}

export default function CreateVideogame() {

  let dispatch=useDispatch();
  useEffect (()=>{dispatch(getGenres())});
  let genres =useSelector(state =>state.genres);


  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
  "name": '',
  "description": '',
  "image":"2wCEAAkGBxQRERETFBERFBYWGRgYFhgRERMWFhYXFhYXGBwWFBYZISoiGRsnHBYXIzYkJyswMDAwGCI2OzYvOiovMC0BCwsLDw4PHBERGy8nIigwMTEvMDIzOC0xMC0vMi8vLzAvMS8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vMf",
  "release":'',
  "rating":'',
  "genre":['RPG'],
  "platforms":['PC'],
});

const handleclick= (e) =>{
  e.preventDefault()
  dispatch(postVideogame(input))
  console.log(input)

}

const handleInputChange = function(e) {
  setInput({
    ...input,
    [e.target.name]: e.target.value
});
setErrors(validate({
    ...input,
    [e.target.name]: e.target.value
}))
  }

  return (
    <div className='container'><Nav/>
    <h1>
        Add your videogame
      </h1>
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
          <label>Description </label>
            <input className={errors.description && 'danger'}
            type="description" name="description" value={input.description} onChange={(e) => handleInputChange(e)} />
            {errors.description && (
              <p className="danger">{errors.description}</p>
            )}
        </div>
        <div className='form'>
          <label>released </label>
            <input className={errors.release && 'danger'}
            type="text" name="release" value={input.release} onChange={(e) => handleInputChange(e)}  />
            {errors.release && (
              <p className="danger">{errors.release}</p>
            )}
        </div>
        <div className='form'>
          <label>Rating </label>
            <input className={errors.rating && 'danger'}
            type="text" name="rating" value={input.rating} onChange={(e) => handleInputChange(e)} />
            {errors.rating && (
              <p className="danger">{errors.rating}</p>
            )}
            <div className='form'>
            <label>Platforms </label>
              <select  name="Platforms">
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
      <button >Create</button>
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

