import icons from './../../img/icons.svg';
import View from './View';

export class ResultView extends View {
  errorMessage = 'We could not find that recipe. Please try another one!';

  _generateMarkup() {
    const idUrl = window.location.hash.slice(1);
    console.log(idUrl);
    return this._data
      .map(r => {
        const { publisher, image_url: imageUrl, title, id, key } = r;

        return `<li class="preview">
        <a class="preview__link ${
          idUrl === id ? 'preview__link--active' : 'preview__link'
        }"  href="#${id}">
          <figure class="preview__fig">
            <img src="${imageUrl}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${title}</h4>
            <p class="preview__publisher">${publisher}</p>
            <div class="preview__user-generated ${key ? '' : 'hidden'}">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>`;
      })
      .join('');
  }
}

export const resultView = new ResultView(document.querySelector('.results'));
