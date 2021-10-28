//TMIB REST API

const API_KEY = "api_key=9fee2dfca9fac3b1049c2bca2752291c";
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&"+API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form')
const search = document.getElementById('search')




getMovies(API_URL);

function getMovies(url) {

    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        if(data.results.length !== 0){
            showMovies(url, data.results);
        }else{
            main.innerHTML= `<h1 class="no-results">No Results Found</h1>`
        }

    })

}

function showMovies(url, data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, id} = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie-list');
        movieElement.innerHTML = `
            <img id="img${id}" class="movie-list-img" src="${poster_path? IMG_URL+poster_path:"http://via.placeholder.com/1080x1580"}" alt="${title}">
    
            <div id="info${id}" class="movie-list-info">
                <h3 class="movie-list-title">${title}</h3>
                
                <span class="${getColor(vote_average)}"><i class="fas fa-star"></i> ${vote_average}</span>
            </div>
            
            <div class="movie-list-desc">
                <button id="${id}" class="movie-list-button">Details</button>
            </div>
            
        `
        main.appendChild(movieElement);

        document.getElementById("img"+id).addEventListener('click', () => {
            console.log(id)
            openModal(url, movie)
        })
        document.getElementById(id).addEventListener('click', () => {
            console.log(id)
            openModal(url, movie)
        })
        document.getElementById("info"+id).addEventListener('click', () => {
            console.log(id)
            openModal(url, movie)
        })
    })
}
        
function getColor(vote) {
    if(vote >= 8){
        return "green"
    }else if(vote >= 5){
        return "yellow"
    }else{
        return "red"
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchItem = search.value;

    if(searchItem) {
        getMovies(searchURL+'&query='+searchItem);
    }else{
        getMovies(API_URL);
    }
})

const overlayContent = document.getElementById('overlay-content');
function openModal(url, movie) {
    fetch(url).then(res => res.json()).then(detailsData => {
        console.log(detailsData);
        if (detailsData){
            document.getElementById("myNav").style.width = "100%";

            if (detailsData.results.length > 0){
                var content = `
                <h1 class="modal-header">${movie.title}</h1>
                
                <img class="modal-backdrop-img" src="${movie.backdrop_path? IMG_URL+movie.backdrop_path:"https://via.placeholder.com/500x281"}" alt="${movie.title}">

                <div class="modal-body">
                    ${movie.overview}
                </div>
                `
                overlayContent.innerHTML = content;
            }else{
                overlayContent.innerHTML = `<h1 class="modal-header">No Results Found</h1>`
            }
        }
    })
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeModal() {
    document.getElementById("myNav").style.width = "0%";
}

// TOGGLE
const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
    ".main, .navbar-container, .toggle, .search"
);


ball.addEventListener("click", () => {
    items.forEach((item) => {
        item.classList.toggle("active");
    });
    ball.classList.toggle("active");
});


