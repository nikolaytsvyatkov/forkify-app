import View from "./View";
import icons from './../../img/icons.svg';
import {ResultView} from './ResultView'


class BookmarkView extends ResultView {
  errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  
  _generateMarkup() {
     
    return this._data.map(r => {
      const {publisher, image_url: imageUrl, title, id} = r;

      return `<li class="preview">
      <a class="preview__link preview__link"  href="#${id}">
        <figure class="preview__fig">
          <img src="${imageUrl}" alt="Test" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${title}</h4>
          <p class="preview__publisher">${publisher}</p>
          <div class="preview__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>`;
   
    }).join('');
  }
    


}

export default new BookmarkView(document.querySelector('.bookmarks'));