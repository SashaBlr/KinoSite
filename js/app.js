const API_KEY = "4d582484-4030-47df-8005-a43c1a9ae47e";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

getMovies(API_URL_POPULAR);

async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();
  showMovies(respData);
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote > 5) {
    return "yellow";
  } else {
    return "red";
  }
}

function showMovies(data) {
  const moviesEl = document.querySelector(".movies");

  // Clear previous movies
  moviesEl.innerHTML = "";

  if (data.films) {
    data.films.forEach((movie) => {
      // Exclude movies with ratings presented in %
      if (!movie.rating.endsWith('%')) {
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
          <div class="movie_cover_inner">
            <img
              src="${movie.posterUrlPreview}"
              class="movie_cover"
              alt="${movie.nameRu}"
            />
            <div class="movie_cover_darkened"></div>
          </div>
          <div class="movie_info">
            <div class="movie_title">${movie.nameRu}</div>
            <div class="movie_category">${movie.genres.map(
              (genre) => ` ${genre.genre}`
            )}</div>
            ${
              movie.rating &&
              `
              <div class="movie_average_rating movie_average_${getClassByRate(
                movie.rating
              )}">${movie.rating}</div>
            `
            }
          </div>
        `;
        moviesEl.appendChild(movieEl);
      }
    });
  }
}

const form = document.querySelector("form");
const search = document.querySelector(".header_search");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);

    search.value = "";
  }
});