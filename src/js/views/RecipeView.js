import icons from './../../img/icons.svg';
import View from './View';
import {Fraction} from 'fractional';

class RecipeView extends View {
  errorMessage = 'We could not find that recipe. Please try another one!';

    _generateMarkup() {
       const {publisher, ingredients, source_url: sourceUrl, image_url: imageURL, title, cooking_time: cookingTime, servings, bookmarked} = this._data;
      return `
   <figure class="recipe__fig">
     <img src="${imageURL}" alt="Tomato" class="recipe__img" />
     <h1 class="recipe__title">
       <span>${title}</span>
     </h1>
   </figure>

   <div class="recipe__details">
     <div class="recipe__info">
       <svg class="recipe__info-icon">
         <use href="${icons}#icon-clock"></use>
       </svg>
       <span class="recipe__info-data recipe__info-data--minutes">${cookingTime}</span>
       <span class="recipe__info-text">minutes</span>
     </div>
     <div class="recipe__info">
       <svg class="recipe__info-icon">
         <use href="${icons}#icon-users"></use>
       </svg>
       <span class="recipe__info-data recipe__info-data--people">${servings}</span>
       <span class="recipe__info-text">servings</span>

       <div class="recipe__info-buttons">
         <button data-update-to = ${servings - 1} class="btn--tiny btn--increase-servings">
           <svg>
             <use href="${icons}#icon-minus-circle"></use>
           </svg>
         </button>
         <button data-update-to = ${servings + 1}  class="btn--tiny btn--increase-servings">
           <svg>
             <use href="${icons}#icon-plus-circle"></use>
           </svg>
         </button>
       </div>
     </div>

     <div class="recipe__user-generated">
       <svg>
         <use href="${icons}#icon-user"></use>
       </svg>
     </div>
     <button class="bookmarkButton btn--round">
       <svg class="">
         <use href="${icons}#icon-bookmark${bookmarked ? '-fill':''}"></use>
       </svg>
     </button>
   </div>

   <div class="recipe__ingredients">
     <h2 class="heading--2">Recipe ingredients</h2>
     <ul class="recipe__ingredient-list">
       ${ingredients.map(ing => {
      
         return `<li class="recipe__ingredient">
         <svg class="recipe__icon">
           <use href="${icons}#icon-check"></use>
         </svg>
         <div class="recipe__quantity">${ing.quantity === null ? '' : new Fraction(ing.quantity).toString()}</div>
         <div class="recipe__description">
           <span class="recipe__unit">${ing.unit}</span>
           ${ing.description}
         </div>
       </li>`;
         
       ;}).join('')}


       

       <li class="recipe__ingredient">
         <svg class="recipe__icon">
           <use href="${icons}#icon-check"></use>
         </svg>
         <div class="recipe__quantity">0.5</div>
         <div class="recipe__description">
           <span class="recipe__unit">cup</span>
           ricotta cheese
         </div>
       </li>
     </ul>
   </div>;

   <div class="recipe__directions">
         <h2 class="heading--2">How to cook it</h2>
         <p class="recipe__directions-text">
           This recipe was carefully designed and tested by
           <span class="recipe__publisher">${publisher}</span>. Please check out
           directions at their website.
         </p>
         <a
           class="btn--small recipe__btn"
           href="${sourceUrl}"
           target="_blank"
         >
           <span>Directions</span>
           <svg class="search__icon">
             <use href="${icons}#icon-arrow-right"></use>
           </svg>
         </a>
       </div>
   `;
   }

   

    addHandlerRender(handler) {
      [`hashchange`, 'load'].forEach(event => window.addEventListener(event, handler));
    }

    addHandlerUpdateServind(handler) {
      this.parentElement.addEventListener('click', (event) => {
        const btn = event.target.closest('.btn--increase-servings');
        
        if (!btn) return

        const pageToGo = +btn.dataset.updateTo;
        if (pageToGo < 1) return;
        handler(pageToGo);
        

      })
    }

    addHandlerUpdateBookmark(handler) {
      this.parentElement.addEventListener('click', (event) => {
        const updateBtn = event.target.closest('.bookmarkButton');
        if (!updateBtn) return
        handler(this._data);
        
      }) 

      
    }
    
}



export default new RecipeView(document.querySelector('.recipe'));