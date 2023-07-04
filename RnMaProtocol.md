Rick and Morty App Recap Project Part 3

- Reading the Task
- Discussed how we are gonna approach the group project
- Create Repository on Github
  - Share access with other users via this guidance: https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository
- Create step by step branches (e.g. test branch, card branch, protocol branch, etc.)

Tasks:

Character Card Component:

- created a function inside the card.js called createCharacterCard
- generate HTML of the card with innerHTML
- Cut and Put the relevant HTML Code in the function
- dynamic elements:
  - src of image
  - name of character
  - status, type and occurrences values
    whole team is working on it
    > Note: Where to find all the infomation of the character objects you will recieve from the api?

components/card/card.js

```js
export const cardContainer = document.querySelector(
  '[data-js="card-container"]'
);

export function createCharacterCard(card) {
  console.log("test: ", card);
  // data.forEach((card) => {
  const newCard = document.createElement("li");
  newCard.classList.add("card");
  newCard.innerHTML = `
 <div class="card__image-container">
      <img
        class="card__image"
        src=${card.image}
        alt=${card.name}
      />
      <div class="card__image-gradient"></div>
    </div>
    <div class="card__content">
      <h2 class="card__title">${card.name}</h2>
      <dl class="card__info">
        <dt class="card__info-title">Status</dt>
        <dd class="card__info-description">${card.status}</dd>
        <dt class="card__info-title">Type</dt>
        <dd class="card__info-description">${card.type}</dd>
        <dt class="card__info-title">Occurrences</dt>
        <dd class="card__info-description">${card.episode.length}</dd>
      </dl>
    </div>`;

  cardContainer.append(newCard);

  // });
}
```

Fetch the Data:

- inside index.js create function called fetchCharacters
- first 20 characters from the API
  - correct api entpoints in the docs
- Import the createCharacterCard function
- use array methods to create an HTML card for each character
  - append it to the cardContainer
- cardContainer is emptied every time new characters fetch - innerHTML=''
- call function inside index.js

utils/fetchdata.js

```js
import { createCharacterCard, cardContainer } from "../components/card/card.js";

async function fetchCharacters(apiUrl) {
  const response = await fetch(apiUrl);
  const JSON = await response.json();
  const data = await JSON.results;
  console.log(data);
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
```

index.js

```js
import { render } from "./utils/fetchData.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

nextButton.addEventListener("click", () => {
  pageNumber = pageNumber + 1;
  render(apiUrl);
});

//fetch character data and render
let pageNumber = 1;
let apiUrl = `https://rickandmortyapi.com/api/character/?page=${pageNumber}`;
render(apiUrl);
```

Pagination:

- add string ?page=<pageIndex> to the end of the fetch URL
- use state variable page to track current page index
- info part -> max page count
- add eventlistener that:
  - prevents higher page number then max of 20 or below 1
  - page index is increaded/decreased
  - fetchCharacters function is called
- update pagination display each time characters are fetched to show the current page index and the current max page, for example: ( 04/20 )

components/nav-pagination/nav-pagination.js

```js
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
```

utils/states.js

```js
// States
export const maxPage = 42;
export let page = 1;
export const searchQuery = "";
```

index.js

```js
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
```

The Search Bar:

- Submit Event Listener on Search bar
- update state variable "searchQuery" with current text inside every time this event is triggered.
- modify fetch URL by adding encoded attribute name: append &name=<searchQuery> to the url.
- trigger the function fetchCharacters when submit
  > Note: how the page and max page index might have to change when you start searching for only subsets of all characters.

```js index.js
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
searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target));
  const searchQuery = data.query;

  const searchUrl = `${apiUrl}&name=${searchQuery}`;
  render(searchUrl);

  searchBar.reset();
  searchBar.query.focus();
});
```

Extra: Refactoring your Code:

- remove hardcoded html and generate via js
  - next, prev button
  - pagination
  - search bar
- call component functions and return elements:
  - createButton, createPagination, createSearchBar
- use extra input parameter onClick or onSubmit in components
- use create function in index.js to generate UI components
- append the created components at the right place in HTML

Positive Feedback from CJ so far:

- Lot of different commits from all users in the group

- util folder good structure

- states changing with let -> put all vars beforehand in the states.js
