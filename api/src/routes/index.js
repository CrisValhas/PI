const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {createGame,getVideoGamesId,getAll} = require('./controllers/videogames.js')
const {getGenres} = require('./controllers/genres.js')



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/genres", getGenres)

router.get("/videogames", getAll)

router.post("/videogame", createGame)

router.get('/videogame/:id', getVideoGamesId)


module.exports = router;
// [ ] Un formulario controlado con JavaScript con los siguientes campos:
// Nombre
// Descripción
// Fecha de lanzamiento
// Rating
// [ ] Posibilidad de seleccionar/agregar varios géneros
// [ ] Posibilidad de seleccionar/agregar varias plataformas
// [ ] Botón/Opción para crear un nuevo videojuego
// Es requisito que el formulario de creación esté validado con JavaScript y no sólo con validaciones HTML.
// Pueden agregar las validaciones que consideren. Por ejemplo: Que el nombre del juego no pueda contener algunos símbolos,
// que el rating no pueda exceder determinado valor, etc.