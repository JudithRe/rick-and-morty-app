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

Fetch the Data:

- inside index.js create function called fetchCharacters
- first 20 characters from the API
  - correct api entpoints in the docs
- Import the createCharacterCard function
- use array methods to create an HTML card for each character
  - append it to the cardContainer
- cardContainer is emptied every time new characters fetch - innerHTML=''
- call function inside index.js

Pagination:

- add string ?page=<pageIndex> to the end of the fetch URL
- use state variable page to track current page index
- info part -> max page count
- add eventlistener that:
  - prevents higher page number then max of 20 or below 1
  - page index is increaded/decreased
  - fetchCharacters function is called
- update pagination display each time characters are fetched to show the current page index and the current max page, for example: ( 04/20 )

The Search Bar:

- Submit Event Listener on Search bar
- update state variable "searchQuery" with current text inside every time this event is triggered.
- modify fetch URL by adding encoded attribute name: append &name=<searchQuery> to the url.
- trigger the function fetchCharacters when submit
  > Note: how the page and max page index might have to change when you start searching for only subsets of all characters.

Extra: Refactoring your Code:
