require("@babel/polyfill");
import Search from "./model/search";

// Web APP iin tuluw
//Hailtiin query, ur dun
//Tuhain uzuulj baigaa jor
// Like iin joruud
//Zahialj baigaa joriin nairlaguud
const state = {};

const controlSearch = async () => {
  // 1)Web ees hailtiin tulhuur ugiig gargaj avna
  const query = "pizza";

  if (query) {
    // 2)Shineer hailtiin object iig uusgej ugnu
    state.search = new Search(query);
    // 3)hailt hiihed zoriulj UI beltgen

    // 4)Hailtiig guitsetgen
    await state.search.doSearch();
    //5) hailtiin ur dung delgetsend uzuulne
    console.log(state.search.result);
  }
};

document.querySelector(".search").addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});
