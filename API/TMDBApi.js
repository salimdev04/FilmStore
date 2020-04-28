//API/TMBDApi

const API_TOKEN = "8b3cc98a51bc482412f7e859c78fcaca"

export function getFilmsFromApiWithSearchedText(text, page){
    const url='https://api.themoviedb.org/3/search/movie?api_key=' +  API_TOKEN +
            '&language=fr&query=' + text + '&page=' + page
    
    return fetch(url)
            .then((response)=> response.json())
            .catch((error)=>console.error(error))
}

export function getFilmsTrailer(id){
    return fetch('https://api.themoviedb.org/3/movie/' + id +'/videos?api_key=' + API_TOKEN)
            .then((response)=> response.json())
            .catch((error)=>console.error(error))
}

export function getImageFromApi(name){
    return 'https://image.tmdb.org/t/p/w500' + name
}

export function getFilmDetailFromApi(id){
    return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr')
            .then((response)=>response.json())
            .catch((error)=>console.error(error))
}

export function getPopularFilm(page){
    return fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&append_to_response=videos&api_key=' + API_TOKEN + '&page='+ page)
            .then((response)=>response.json())
            .catch((error)=>console.error(error))
}

export function getUpcomingFilm(page){
    return fetch('https://api.themoviedb.org/3/movie/upcoming?page=1&language=fr&append_to_response=videos&api_key=' + API_TOKEN + '&page='+ page)
            .then((response)=>response.json())
            .catch((error)=>console.error(error))
}
