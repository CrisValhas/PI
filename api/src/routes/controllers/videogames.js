const axios = require('axios');
require("dotenv").config();
const { Videogame, Genre } = require('../../db.js');
const { API_KEY } = process.env;



const getVideoGamesId= async (req, res,next) => {
    const id = req.params.id
    try {
        let gameDb = await Videogame.findByPk(id,{
            include: {
                model: Genre,
                attributes: ["name"],
                    through: {
                        attributes: []
                    }}})
        if (gameDb){return res.status(200).send(gameDb)}
        let gameApi = await searchByIdApi(id)
        if (gameApi){return res.status(200).send(gameApi)}
        return res.status(404).send("The videogame doesn't exist")
    } catch (error) {
        return next(error)
    }
}

const createGame = async (req, res,next) => {
        try{
            const{name,description,release,rating,image,platforms,genre}= req.body;
            const newgame = await Videogame.findOne({where:{name : name}})
            if (newgame){
                return res.status(404).send("this game is already exist")
            }
            const newVideogame = await Videogame.create({name,description,release,rating,image,platforms})
            await newVideogame.addGenres(genre);
            return res.json(newVideogame);
    
        }
        catch(err){
            next(err);
        }
    
    }
    

const getApiVideogamesbyName = async (name) => {
    const apiURL = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
    const apiInfo = apiURL.data.results.map(e => {
        return {
            id: e.id,
            name: e.name,
            released: e.released,
            rating: e.rating,
            image: e.background_image,
            platforms: e.platforms.map(e => e.platform.name),
            genres: e.genres.map(e => e.name)
        }
    })
    return apiInfo; /* para buscar por nombre TODAS */
}

const searchByIdApi = async (id) => {
    const videogame = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    const infoId = {
        name: videogame.data.name,
        released: videogame.data.released,
        rating: videogame.data.rating,
        image: videogame.data.background_image,
        description: videogame.data.description_raw,
        platforms: videogame.data.platforms.map(e => e.platform.name),
        genres: videogame.data.genres.map(e => e.name)
    }
    return infoId;
}

const getApi100Videogames = async () => {
    const apiURL1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`)
    const apiURL2 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=40`)
    const apiURL3 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=20`)
    const apiURLS = apiURL1.data.results.concat(apiURL2.data.results, apiURL3.data.results)
    const apiInfo = apiURLS.map(e => {
        return {
            id: e.id,
            name: e.name,
            released: e.released,
            rating: e.rating,
            image: e.background_image,
            platforms: e.platforms.map(e => e.platform.name),
            genres: e.genres.map(e => e.name)
        }
    })
    /* console.log(apiInfo)  ME TRAE BIEN ACÁ */
    return apiInfo; /* para mostrar en el paginado */
}

const getDbVideogames = async () => {
    const prueba =  await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })
    if (prueba){const final = prueba.map(e => {
        return{
            id: e.id,
            name: e.name,
            released: e.released,
            rating: e.rating,
            image: e.image,
            platforms: e.platforms,
        }
    })
    return final
    }
    
}

const getAllVideogames = async () => {
    const apiInfo = await getApi100Videogames();
    const dbInfo = await getDbVideogames();
    const infoTotal = apiInfo.concat(dbInfo);
    /* console.log(infoTotal) ME TRAE BIEN ACÁ */
    return infoTotal /* Para mostrar en el paginado revisar si se necesita*/ 
}

const getAll = async (req, res) => {
    let {name} = req.query;
    try{
        const allDbVideogames = await getDbVideogames();
        const paginadoVideogames = await getAllVideogames();
        if(name){
            name = name.toLowerCase();
            const videogamesByNameApi = await getApiVideogamesbyName(name);
            if (allDbVideogames){
                let videogamesByNameDb = allDbVideogames.filter(e => e.name.toLowerCase().includes(name))
                const allVideogamesbyName = videogamesByNameDb.concat(videogamesByNameApi)
                allVideogamesbyName ?
                res.status(200).send(allVideogamesbyName): res.status(400).send("we couldn't find the videogame that you are looking for")
            }
            
            
        }
        else {
            res.status(200).send(paginadoVideogames);
        }
    } catch (err) {
        console.log(err);
    }
}


module.exports = { getAllVideogames, searchByIdApi, getApiVideogamesbyName, getDbVideogames,createGame,getVideoGamesId,getAll }