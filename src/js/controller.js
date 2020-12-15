import { async } from 'regenerator-runtime';

import recipeView from './views/RecipeView'
import resultView from './views/ResultView'
import searchView from './views/SearchView'
import {state, loadRecipe, loadSearchResults} from './model'

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
    console.error(err);
 }
    
}

const controlSearchResults = async function() {

  try {
    
    const query = searchView.getInputValue();
    if (!query) throw new Error();
    resultView.renderSpinner();
    console.log(query);
    

    
    await loadSearchResults(query);
    resultView.render(state.search.results);
  }catch(err) {
      resultView.renderError();
  }
    
}



async function init() {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addSearchHandler(controlSearchResults);
 
}

init();