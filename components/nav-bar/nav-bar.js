// render navBar
import { page, maxPage } from "../../index.js";

export function createNavigation() {
  const prevButton = document.createElement("button");
  prevButton.textContent = "previous";
  prevButton.classList.add("button");
  prevButton.setAttribute("data-js", "button-prev");

  const pagination = document.createElement("span");
  pagination.textContent = `${page} / ${maxPage}`;
  pagination.classList.add("navigation__pagination");
  pagination.setAttribute("data-js", "pagination");

  const nextButton = document.createElement("button");
  nextButton.textContent = "next";
  nextButton.classList.add("button");
  nextButton.setAttribute("data-js", "button-next");
  const navigation = document.querySelector('[data-js="navigation"]');
  navigation.append(prevButton, pagination, nextButton);
}
