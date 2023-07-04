import { createCharacterCard, cardContainer } from "../components/card/card.js";

async function fetchCharacters(apiUrl) {
  const response = await fetch(apiUrl);
  const JSON = await response.json();
  const data = await JSON.results;
  //   console.log(data);
  return data;
}

export async function render(apiUrl) {
  try {
    cardContainer.innerHTML = [];
    const allCharacters = await fetchCharacters(apiUrl);
    allCharacters.forEach((character) => {
      createCharacterCard(character);
    });
  } catch (error) {
    console.log("error: ", error);
  }
}
