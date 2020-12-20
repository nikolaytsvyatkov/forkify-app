import { async } from 'regenerator-runtime';
import { URL, numPerPage, KEY } from './config';
import { AJAX } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    numPerPage: numPerPage,
  },
  bookmarks: [],
};

// {cooking_time : cookingTime, id, image_url: imageURL,
//   ingredients, publisher,source_url: sourceUrl,
//    servings, title}

export async function loadRecipe(id) {
  try {
    const data = await AJAX(`${URL}/${id}`);

    state.recipe = { ...data.data.recipe };

    if (state?.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
}

export async function loadSearchResults(query) {
  state.search.query = query;
  try {
    const data = await AJAX(`${URL}?search=${query}&key=${KEY}`);
    state.search.results = [...data.data.recipes];
  } catch (err) {
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
  const { servings, ingredients } = state.recipe;
  const newServings = [...ingredients];
  if (newServing > servings) {
    //increase
    newServings.map(ing => (ing.quantity += ing.quantity / servings));
  } else {
    newServings.map(ing => (ing.quantity -= ing.quantity / servings));
  }

  state.recipe.servings = newServing;
  state.recipe.ingredients = newServings;

  // newServing.map(ing => ing.)
}

export const addBookmark = function (recipe) {
  if (state.recipe.bookmarked) return;
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  state.bookmarks.push(recipe);

  persistBookmark();
};

export const removeBookmark = function (recipe) {
  console.log('removing');

  const index = state.bookmarks.findIndex(el => el.id === recipe.id);
  state.bookmarks.splice(index, 1);

  if (state.recipe.id === recipe.id) state.recipe.bookmarked = false;

  persistBookmark();
};
const persistBookmark = function () {
  window.localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
  console.log(JSON.parse(window.localStorage.getItem('bookmarks')));
};

const init = function () {
  const storage = window.localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);

  console.log(state.bookmarks);
};
init();

export const uploadRecipe = async function (data) {
  try {
    const ingredients = Object.entries(data)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(([key, value]) => {
        const [quantity, unit, description] = value.split(',');
        return {
          description: description,
          quantity: quantity ? +quantity : null,
          unit: unit,
        };
      });

    const recipe = {
      title: data.title,
      source_url: data.sourceUrl,
      image_url: data.image,
      publisher: data.publisher,
      cooking_time: +data.cookingTime,
      servings: +data.servings,
      ingredients,
    };

    const obj = await AJAX(`${URL}?key=${KEY}`, recipe);
    // const {
    //   publisher,
    //   ingredients,
    //   source_url: sourceUrl,
    //   image_url: imageURL,
    //   title,
    //   cooking_time: cookingTime,
    //   servings,
    //   bookmarked,
    // } = obj.recipe;

    console.log(obj.data.recipe);

    state.recipe = { ...obj.data.recipe };
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }

  // export const uploadRecipe = async function (newRecipe) {
  //   try {
  //     const ingredients = Object.entries(newRecipe)
  //       .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
  //       .map(ing => {
  //         const ingArr = ing[1].split(',').map(el => el.trim());
  //         // const ingArr = ing[1].replaceAll(' ', '').split(',');
  //         if (ingArr.length !== 3)
  //           throw new Error(
  //             'Wrong ingredient fromat! Please use the correct format :)'
  //           );

  //         const [quantity, unit, description] = ingArr;

  //         return { quantity: quantity ? +quantity : null, unit, description };
  //       });

  //     const recipe = {
  //       title: newRecipe.title,
  //       source_url: newRecipe.sourceUrl,
  //       image_url: newRecipe.image,
  //       publisher: newRecipe.publisher,
  //       cooking_time: +newRecipe.cookingTime,
  //       servings: +newRecipe.servings,
  //       ingredients,
  //     };

  //     const data = await sendJSON(`${API_URL}?key=${KEY}`, recipe);
  //     state.recipe = createRecipeObject(data);
  //     addBookmark(state.recipe);
  //   } catch (err) {
  //     throw err;
  //   }
  // description: 'can refrigerated pizza crust dough';
  // quantity: 1;
  // unit: '';
};
