import { page, searchQuery } from "../index.js";

export async function fetchCharacters() {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`
  );
  const JSON = await response.json();
  return JSON;
}
