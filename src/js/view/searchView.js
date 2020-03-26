import { elements } from "./base";

const renderRecipe = recipe => {
  const markup = `  
 <li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${recipe.title}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>`;
  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};
export const clearSearchQuery = () => {
  elements.searchInput.value = "";
};
export const clearSearchResult = () => {
  elements.searchResultList.innerHTML = "";
  elements.pageButtons.innerHTML = "";
};

export const getInput = () => elements.searchInput.value;
export const renderRecipes = (recipes, currentPage = 1, resPerPage = 8) => {
  // Hailtiin ur dung huudaslaj uzuuleh
  //if page=2 start=10 end =20 baina
  const start = (currentPage - 1) * resPerPage;
  const end = currentPage * resPerPage;

  //undefined buruu haisan ued
  recipes.slice(start, end).forEach(el => renderRecipe(el));
  //huudaslaltiin tovchuudiig gargaj ireh
  const totalPages = Math.ceil(recipes.length / resPerPage);
  renderButtons(currentPage, totalPages);
};
const createButton = (
  page,
  type,
  direction
) => `<button class="btn-inline results__btn--${type}" data-goto=${page}>
<span>Хуудас ${page}</span>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${direction}"></use>
</svg>
</button>`;
const renderButtons = (currentPage, totalPages) => {
  let buttonHTML;
  if (currentPage == 1 && totalPages > 1) {
    //1-r huudals der baina, 2-r huudas gedeg tovchiig garga
    buttonHTML = createButton(2, "next", "right");
  } else if (currentPage < totalPages) {
    //Umnuh bolon daraachiin huudasruu shiljih tovchuudiig uzuul
    buttonHTML = createButton(currentPage - 1, "prev", "left");
    buttonHTML += createButton(currentPage + 1, "next", "right");
  } else if (currentPage === totalPages) {
    //hamgiin suuliin huudas deer baina.Umnuh ruu shiljuuleh tovchiih l uzuulne
    buttonHTML = createButton(currentPage - 1, "prev", "left");
  }
  elements.pageButtons.insertAdjacentHTML("afterbegin", buttonHTML);
};
