import { async } from 'regenerator-runtime';

import recipeView from './views/RecipeView'
import {resultView} from './views/ResultView'
import searchView from './views/SearchView'
import pagination from './views/PaginationView'
import bookmarkView from './views/BookmarkView'
import {state, loadRecipe, loadSearchResults, getResultsPage,
updateServings, updateBookmarks} from './model'

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
    const resultsPerPage = getResultsPage(state.search.page);
    pagination.render(state.search);
    resultView.render(resultsPerPage);
  }catch(err) {
      resultView.renderError();
  }
    
}

const controlPagination = function(pageToGo) {
    resultView.render(getResultsPage(pageToGo));
    pagination.render(state.search);

    
}

const controlUpdateServings = function(servings) {
    updateServings(servings);
    console.log(state.recipe)
    recipeView.update(state.recipe);
}

const controlUpdateBookmark = function(recipe) {
  
  updateBookmarks(recipe);
  const stored = window.localStorage.getItem('bookmarks');
  bookmarkView.render(JSON.parse(stored));
}





async function init() {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addSearchHandler(controlSearchResults);
  pagination.addClickHandler(controlPagination);
  recipeView.addHandlerUpdateServind(controlUpdateServings);
  recipeView.addHandlerUpdateBookmark(controlUpdateBookmark);
 
}

init();