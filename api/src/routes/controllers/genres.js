require("dotenv").config();
const axios = require('axios');
const { Videogame, Genre } = require('../../db.js');
const { API_KEY } = process.env;

const getGenres = async (req, res) => {
    try {
        const getGenresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        const genresApi = getGenresApi.data.results.map(e => e.name)
        genresApi.forEach(e => {
            Genre.findOrCreate({
                where: { name: e }
            })
        })
        const allGenres = await Genre.findAll();
        res.status(200).json(allGenres);
    } catch (error) {
        res.status(404).json(error);
    }

}

module.exports = {getGenres}