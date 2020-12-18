import { resultView } from './ResultView';
import View from './View';

class BookmarkView extends View {
  errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
  _generateMarkup() {
    return this._data
      .map(bookmark => {
        return `<li class="preview">
              <a class="preview__link preview__link"  href="#${bookmark.id}">
                <figure class="preview__fig">
                  <img src="${bookmark.image_url}" alt="Test" />
                </figure>
                <div class="preview__data">
                  <h4 class="preview__title">${bookmark.title}</h4>
                  <p class="preview__publisher">${bookmark.publisher}</p>
                  <div class="preview__user-generated">
                    <svg>
                      <use href="${bookmark.icons}#icon-user"></use>
                    </svg>
                  </div>
                </div>
              </a>
            </li>`;
      })
      .join('');
  }

  addHandlerListener(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarkView(document.querySelector('.bookmarks'));
