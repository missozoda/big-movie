// elementlarni chaqirib olish
let elSearchForm = $(".search-form");
let elSearchInput = $(".search-input", elSearchForm);
let elResultMoviesList = $(".movies-list");
let elTemplate = $("#template").content;

movies.splice(100);

// arrayni normalize qilish
let normalizedMovies = movies.map((movie, i) => {
  return {
    id: i + 1,
    title: movie.Title,
    fulltitle: movie.fulltitle,
    year: movie.movie_year,
    categories: movie.Categories.split("|").join(", "),
    summary: movie.summary,
    runtime: movie.runtime,
    language: movie.language,
    youtube: movie.ytid,
  }
})

//templatedan clon olib li yaratish
let createMovieItem = (movie) => {
  elResultMoviesList.innerHTML = "";

  let elNewLi = elTemplate.cloneNode(true);

  $(".youtube-link", elNewLi).href = `https://www.youtube.com/watch?v=${movie.youtube}`;
  $("img", elNewLi).src = `https://i3.ytimg.com/vi/${movie.youtube}/maxresdefault.jpg`
  $(".title", elNewLi).textContent = `Title: ${movie.title}`;
  $(".fulltitle", elNewLi).textContent = `Fulltitle: ${movie.fulltitle}`;
  $(".year", elNewLi).textContent = `Year: ${movie.year}`;
  $(".categories", elNewLi).textContent = `Categories: ${movie.categories}`;
  $(".summary", elNewLi).textContent = `Summary: ${movie.summary}`;
  $(".runtime", elNewLi).textContent = `Runtime: ${movie.runtime}`;
  $(".language", elNewLi).textContent = `Language: ${movie.language}`;

  return elNewLi;
}

let rendomMovies = (movies) => {
  let elResultFragment = document.createDocumentFragment();

  movies.forEach ((movie) => {
    elResultFragment.appendChild(createMovieItem(movie));
  })

  elResultMoviesList.appendChild(elResultFragment);
}

rendomMovies(normalizedMovies);

elSearchForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  
  let searchMovie = new RegExp(elSearchInput.value.trim(), "gi");
  
  let searchResult = normalizedMovies.filter((movie) => {
    if (movie.title.match(searchMovie)){
      return true;
    }
  })
  rendomMovies(searchResult);
})