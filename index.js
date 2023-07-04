import { render } from "./utils/fetchData.js";
import {
  increasePageCount,
  decreasePageCount,
} from "./components/nav-pagination/nav-pagination.js";
import { page } from "./utils/states.js";
import { maxPage } from "./utils/states.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

//fetch character data and render
const apiUrl = `https://rickandmortyapi.com/api/character/?page=1`;
render(apiUrl);

pagination.textContent = `${page}/${maxPage}`;

nextButton.addEventListener("click", () => {
  increasePageCount();
});

prevButton.addEventListener("click", () => {
  decreasePageCount();
});
