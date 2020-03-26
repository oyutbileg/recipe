import axios from "axios";
require("@babel/polyfill");

export default class Recipe {
  constructor(id) {
    this.id = id;
  }
  async getRecipe() {
    try {
      let result = await axios(
        "https://forkify-api.herokuapp.com/api/get?rId=" + this.id
      );
      this.publisher = result.data.recipe.publisher;
      this.ingredients = result.data.recipe.ingredients;
      this.source_url = result.data.recipe.source_url;
      this.image_url = result.data.recipe.image_url;
      this.publisher_url = result.data.recipe.publisher_url;
      this.title = result.data.recipe.title;
      this.social_rank = result.data.recipe.social_rank;

      //return this.result;
    } catch (error) {
      console.log("Aldaa garlaa " + error);
    }
  }
  calcTime() {
    //Nairlag burt oiroltsoogoor 5 min zartsuulna
    this.time = this.ingredients.length * 5;
  }
  calcHuniiToo() {
    this.huniiToo = 4;
  }
}
