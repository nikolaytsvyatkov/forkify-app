import { async } from 'regenerator-runtime';
import {URL} from './config';
import { getJSON } from './helpers';



export const state = {
    recipe: {},
    search: {
      query: '',
      results: [],
      page: 1,
      numPerPage: 10
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






