import { page, searchQuery } from "../index.js";

export async function fetchCharacters() {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`
  );
  const JSON = await response.json();
  const data = await JSON.results;
  return data;
}

export async function fetchInfo() {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`
  );
  const JSON = await response.json();
  const data = await JSON.info.pages;
  return data;
}
