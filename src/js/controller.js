import { async } from 'regenerator-runtime';
import recipeView from './views/RecipeView';
import { resultView } from './views/ResultView';
import bookmarkView from './views/BookmarkView';
import searchView from './views/SearchView';
import pagination from './views/PaginationView';
import uploadRecipeView from './views/UploadRecipeView';

import * as model from './model';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();
    resultView.update(model.getResultsPage());
    console.log(model.state.recipe);
    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getInputValue();
    if (!query) throw new Error();
    resultView.renderSpinner();
    console.log(query);

    await model.loadSearchResults(query);
    const resultsPerPage = model.getResultsPage(model.state.search.page);
    pagination.render(model.state.search);
    resultView.render(resultsPerPage);
  } catch (err) {
    resultView.renderError();
  }
};

const controlPagination = function (pageToGo) {
  model.state.page = pageToGo;

  resultView.render(model.getResultsPage(pageToGo));
  pagination.render(model.state.search);
};

const controlUpdateServings = function (servings) {
  model.updateServings(servings);

  recipeView.update(model.state.recipe);
};

const controlUpdateBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.removeBookmark(model.state.recipe);
  }

  recipeView.update(model.state.recipe);
  console.log(model.state.recipe);

  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlUploadRecipe = async function (data) {
  uploadRecipeView.renderSpinner();
  await model.uploadRecipe(data);
  uploadRecipeView.renderMessage();
  recipeView.render(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addSearchHandler(controlSearchResults);
  pagination.addClickHandler(controlPagination);
  recipeView.addHandlerUpdateServind(controlUpdateServings);
  recipeView.addHandlerUpdateBookmark(controlUpdateBookmark);
  bookmarkView.addHandlerListener(controlBookmarks);
  uploadRecipeView.uploadHandler(controlUploadRecipe);
};

init();
