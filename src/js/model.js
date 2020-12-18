import { async } from 'regenerator-runtime';
import {URL, numPerPage} from './config';
import { getJSON } from './helpers';



export const state = {
    recipe: {},
    search: {
      query: '',
      results: [],
      page: 1,
      numPerPage: numPerPage
    },
    bookmarks: []

};

// {cooking_time : cookingTime, id, image_url: imageURL, 
//   ingredients, publisher,source_url: sourceUrl,
//    servings, title}


export  async function loadRecipe(id) {
  try {
    
    const data = await getJSON(`${URL}/${id}`);
    
    state.recipe = {...data.data.recipe};
    
    if (state?.bookmarks.some(bookmark => bookmark.id === id))
    state.recipe.bookmarked = true;
  else state.recipe.bookmarked = false;
    

  } catch (err) {
    throw err;
  }
    
};

export async function loadSearchResults(query) {
  state.search.query = query;
  try {
    const data = await getJSON(`${URL}?search=${query}`);
    state.search.results = [...data.data.recipes];
   
  }catch(err) {
    console.error(err);
    throw err;
  }
  
  
  
}

export function getResultsPage(page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.numPerPage; // 0
  const end = page * state.search.numPerPage; 
  
  return state.search.results.slice(start, end);
}


export function updateServings(newServing) {
      const {servings, ingredients} = state.recipe;
      const newServings = [...ingredients];
      if (newServing > servings) {
        //increase
        newServings.map(ing => ing.quantity += (ing.quantity / servings));

      } else {
        newServings.map(ing => ing.quantity -= (ing.quantity / servings));
      }
      
      state.recipe.servings = newServing;
      state.recipe.ingredients = newServings;

      
      // newServing.map(ing => ing.)
}

export const addBookmark = function(recipe) {
    if(state.recipe.bookmarked) return;
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

    state.bookmarks.push(recipe);
    
    
    persistBookmark()
   
}

export const removeBookmark = function(recipe) {
  console.log('removing')

  const index = state.bookmarks.findIndex(el => el.id === recipe.id);
  state.bookmarks.splice(index, 1);


  if (state.recipe.id === recipe.id) state.recipe.bookmarked = false;

  
}
const persistBookmark = function() {
  
  window.localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
  console.log(JSON.parse(window.localStorage.getItem('bookmarks')))
  
}

const init = function () {
  
  const storage = window.localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
  
  console.log(state.bookmarks)

};
init();


