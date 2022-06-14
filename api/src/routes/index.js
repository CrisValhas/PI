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