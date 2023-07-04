import { fetchCharacters, fetchInfo } from "./utils/fetchData.js";
import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
export const pagination = document.querySelector('[data-js="pagination"]');

// States

export let maxPage = 42;
export let searchQuery = "";
export let page = 1;

//fetch character data and render
render(`https://rickandmortyapi.com/api/character/?page=${page}`);

pagination.textContent = `${page}/${maxPage}`;

nextButton.addEventListener("click", () => {
  increasePageCount();
});

prevButton.addEventListener("click", () => {
  decreasePageCount();
});

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target));
  searchQuery = data.query;
  page = 1;
  render();
  searchBar.reset();
  searchBar.query.focus();
});

function increasePageCount() {
  if (page >= 1 && page < maxPage) {
    page++;
    render();
  }
}

function decreasePageCount() {
  if (page > 1 && page <= maxPage) {
    page--;
    render();
  }
}

async function render() {
  try {
    cardContainer.innerHTML = [];
    maxPage = await fetchInfo();
    const allCharacters = await fetchCharacters();
    allCharacters.forEach((character) => {
      createCharacterCard(character);
    });
    pagination.textContent = `${page}/${maxPage}`;
  } catch (error) {
    console.log("error: ", error);
  }
}
