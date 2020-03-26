require("@babel/polyfill");
import Search from "./model/search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";
import List from "./model/List";
import Like from "./model/Like";
import * as likesView from "./view/likesView";
import {
  renderRecipe,
  clearRecipe,
  highlightSelectedRecipe
} from "./view/recipeView";
import * as listView from "./view/listView";

// Web APP iin tuluw
//Hailtiin query, ur dun
//Tuhain uzuulj baigaa jor
// Like iin joruud
//Zahialj baigaa joriin nairlaguud
const state = {};
const controlSearch = async () => {
  // 1)Web ees hailtiin tulhuur ugiig gargaj avna
  const query = searchView.getInput();
  if (query) {
    // 2)Shineer hailtiin object iig uusgej ugnu
    state.search = new Search(query);
    // 3)hailt hiihed zoriulj UI beltgen
    searchView.clearSearchQuery();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);
    // 4)Hailtiig guitsetgen
    await state.search.doSearch();
    //5) hailtiin ur dung delgetsend uzuulne
    clearLoader();
    if (state.search.result === undefined) alert("Ilerts oldsongui ");
    else searchView.renderRecipes(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});
elements.pageButtons.addEventListener("click", e => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const gotoPageNumber = parseInt(btn.dataset.goto);
    searchView.clearSearchResult();
    searchView.renderRecipes(state.search.result, gotoPageNumber);
  }
});
// JOriin controller
const controlRecipe = async () => {
  //1)URL aas ID ig salgaj avna
  const id = window.location.hash.replace("#", "");

  //URL deer ID baigaa esehiig shalgah
  if (id) {
    //2)Joriin model iig uusgej ugnu
    state.recipe = new Recipe(id);
    //3)UI iig beltgeh tseverleh
    clearRecipe();
    renderLoader(elements.recipeDiv);
    highlightSelectedRecipe(id);
    //4)Joroo tataj avchirna
    await state.recipe.getRecipe();
    //5)Joriig guitsetgeh hugatsaa bolon ortsiig tootsooloh
    clearLoader();
    state.recipe.calcTime();
    state.recipe.calcHuniiToo();
    //6)Joroo Delgetsend gargan.
    renderRecipe(state.recipe, state.likes.isLiked(id));
  }
};

window.addEventListener("hashchange", controlRecipe);
window.addEventListener("load", controlRecipe);
//shineer like modeliig app dongoj achaalagdahaar uusgen.
window.addEventListener("load", e => {
  if (!state.likes) state.likes = new Like();
  //like tsesiig gargah esehiig shiideh
  likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
  //laikuud baival tedgeeriig tsesend nemj haruulna
  state.likes.likes.forEach(like => likesView.renderLike(like));
});
//Nairlagnii controller
const controlList = () => {
  //Nairlagnii model uusgeh
  state.list = new List();
  //Tseverleh delgets
  listView.clearItems();
  state.recipe.ingredients.forEach(n => {
    //Tuhain nairlagiig model iig hiine
    const item = state.list.addItem(n);
    //Delgetsend gargan
    listView.renderItem(item);
  });
  //Ug model ruu odoo haragdaj baigaa jornii buh nairlagiig avch hiine.
};
//Like controller
const controlLike = () => {
  //1) Like iin modeliig uusgen
  if (!state.likes) state.likes = new Like();
  //2) Odoo haragdaj baigaa joriin ID iig olj avah
  const currentRecipeId = state.recipe.id;
  //3) Ene joriig like lasan esehiig shalgah
  if (state.likes.isLiked(currentRecipeId)) {
    //like hiisen bol Like iig ni boliulna
    state.likes.deleteLike(currentRecipeId);
    //haragdaj biagaa like iin tsesnees ni ustgan
    likesView.deleteLike(currentRecipeId);
    //like tovchnii haragdah baidliig boliulah
    likesView.toggleLikeBtn(false);
  } else {
    //Like laagui bol like lan

    const newLike = state.likes.addLike(
      currentRecipeId,
      state.recipe.title,
      state.recipe.publisher,
      state.recipe.image_url
    );

    likesView.renderLike(newLike);
    likesView.toggleLikeBtn(true);
  }
  likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
};
elements.recipeDiv.addEventListener("click", e => {
  if (e.target.matches(".recipe__btn,.recipe__btn *")) {
    controlList();
  } else if (e.target.matches(".recipe__love, .recipe__love *")) {
    controlLike();
  }
});
elements.shoppingList.addEventListener("click", e => {
  //CLick hiisen li element iin dataa=-itemid input iig shuuj avah
  const id = e.target.closest(".shopping__item").dataset.itemid;

  // id tis adil ortiig modeloos ustgan
  state.list.deleteItem(id);
  // Delgetsees ustgan
  listView.deleteItem(id);
});
