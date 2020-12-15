import { async } from 'regenerator-runtime';
import {URL} from './config';
import { getJSON } from './helpers';



export const state = {
    recipe: {},
    search: {
      query: '',
      results: []
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

  try {
    const data = await getJSON(`${URL}?search=${query}`);
    state.search.results = [... data.data.recipes];
  }catch(err) {
    console.error(err);
    throw err;
  }
  
  
  
}






