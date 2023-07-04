import { render } from "../../utils/fetchData.js";
import { maxPage } from "../../utils/states.js";

const pagination = document.querySelector('[data-js="pagination"]');
let page = 1;

export function increasePageCount() {
  if (page >= 1 && page < 42) {
    page++;
    const apiUrl = `https://rickandmortyapi.com/api/character/?page=${page}`;
    render(apiUrl);
    pagination.textContent = `${page}/${maxPage}`;
  }
}

export function decreasePageCount() {
  if (page > 1 && page <= 42) {
    page--;
    const apiUrl = `https://rickandmortyapi.com/api/character/?page=${page}`;
    render(apiUrl);
    pagination.textContent = `${page}/${maxPage}`;
  }
}
