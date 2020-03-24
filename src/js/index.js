require("@babel/polyfill");
import Search from "./model/search";
import { elements } from "./view/base";
import * as searchView from "./view/searchView";
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
    // 4)Hailtiig guitsetgen
    await state.search.doSearch();
    //5) hailtiin ur dung delgetsend uzuulne
    if (state.search.result === undefined) alert("Ilerts oldsongui ");
    else searchView.renderRecipes(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});
