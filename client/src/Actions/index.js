import axios from "axios";

//                         ... a promesas
//                  -----------------------------------
// export const deleteVideogame = (payload) => dispatch =>{
// return axios.delete("https://videogames-app-henry.herokuapp.com/" + payload.id)
// .then(r => r.json())
// .then( json => {
//     dispatch({
//         type: "DELETE_VIDEOGAME",
//         payload: json.data
//         }
//     )
//     }
// ).catch((error)=> console.log(error))
// };

export function deleteVideogame(payload){
    return async function (dispatch) {
        try {
            var json = await axios.delete("https://videogames-app-henry.herokuapp.com/videogame/" + payload.id)
            return dispatch({
                type: "DELETE_VIDEOGAME",
                payload: json.data
            })
        } catch (e) {
            console.log(e)
        }
    }
}
export function reset() {
    return {
        type: "RESET",
    }
}
export function clearCache(){
    return{
        type: "CLEARCACHE",
    }
}
export function getAllVideogames() {
    return async function (dispatch) {
        try {
            var json = await axios.get("https://videogames-app-henry.herokuapp.com/videogames")
            return dispatch({
                type: "GET_ALL_VIDEOGAMES",
                payload: json.data
            })
        } catch (e) {
            console.log(e)
        }

    }
}
export function getVideogamesByName(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.get("https://videogames-app-henry.herokuapp.com/videogames?name=" + payload)
            return dispatch({
                type: "GET_VIDEOGAMES_BY_NAME",
                payload: json.data
            })
        } catch (e) {
            console.log(e)
        }
    }
}
export function getGenres() {
    return async function (dispatch) {
        try {
            var json = await axios.get("https://videogames-app-henry.herokuapp.com/genres")
            return dispatch({
                type: "GET_GENRES",
                payload: json.data
            })
        } catch (e) {
            console.log(e)
        }
    }
}
export function postVideogame(payload) {
    return async function () {
        try {
            var json = await axios.post("https://videogames-app-henry.herokuapp.com/videogame", payload)
            if (json)
            return (alert("videogame created successfully"))
        } catch (e) {
            if(e.response.data.msg){
                return (alert(e.response.data.msg))
                    
            }
            // console.log(e)
        }
    }
}
export function getDetails(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.get("https://videogames-app-henry.herokuapp.com/videogame/" + payload.id)
            return dispatch({
                type: "GET_DETAILS",
                payload: json.data
            })
        } catch (e) {
            console.log(e)
        }
    }
}
export function filterByGenre(payload) {
    return {
        type: "FILTER_BY_GENRE",
        payload
    }
}
export function filterByDborApi(payload) {

    return {
        type: "FILTER_BY_DB_OR_API",
        payload
    }
}
export function orderByName(payload) {
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}
export function orderByRating(payload) {
    return {
        type: "ORDER_BY_RATING",
        payload
    }
}