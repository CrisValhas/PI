require("dotenv").config();
const axios = require('axios');
const { Videogame, Genre } = require('../../db.js');
const { API_KEY } = process.env;

const getGenres = async (req, res) => {
    const getGenresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const genresApi = getGenresApi.data.results.map(e => e.name)
    genresApi.forEach(e => {
        Genre.findOrCreate({
            where: { name: e }
        })
    })
    const allGenres = await Genre.findAll();
    res.send(allGenres);
}

module.exports = {getGenres}