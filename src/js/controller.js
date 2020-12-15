import { async } from 'regenerator-runtime';

import recipeView from './views/RecipeView'
import {state, loadRecipe} from './model'

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipe = async function() {
 try {
  const id = window.location.hash.slice(1);
      
  if (!id) return;

  recipeView.renderSpinner();


  await loadRecipe(id);
  recipeView.render(state.recipe);
 }catch(err) {
    recipeView.renderError();
    console.error(err)
 }
      
 
    
  
}







async function init() {
  recipeView.addHandlerRender(controlRecipe);


}

init();