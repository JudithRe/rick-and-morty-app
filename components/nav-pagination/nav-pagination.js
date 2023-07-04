import { render } from "../../utils/fetchData.js";
import { maxPage } from "../../utils/states.js";

const pagination = document.querySelector('[data-js="pagination"]');
let page = 1;

const mainURL = `https://rickandmortyapi.com/api/character/`;
// const paginatedURL = `https://rickandmortyapi.com/api/character/?page=${page}`;
// const searchURL = `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`;

export function increasePageCount() {
  if (page >= 1 && page < 42) {
    page++;
    //const apiUrl = `https://rickandmortyapi.com/api/character/?page=${page}`;
    render(`${mainURL}?page=${page}`);
    pagination.textContent = `${page}/${maxPage}`;
  }
}

export function decreasePageCount() {
  if (page > 1 && page <= 42) {
    page--;
    // const apiUrl = `https://rickandmortyapi.com/api/character/?page=${page}`;
    render(`${mainURL}?page=${page}`);
    pagination.textContent = `${page}/${maxPage}`;
  }
}
