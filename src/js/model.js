import { async } from 'regenerator-runtime';
import {URL} from './config';
import { getJSON } from './helpers';



export const state = {
    recipe: {},
    search: {},
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

export async function loadSearchResults() {
  const data = await getJSON(`${URL}?search=pizza`);
  state.search = {... data.data}
  
  
}






