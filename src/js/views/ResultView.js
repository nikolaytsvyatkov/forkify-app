import icons from './../../img/icons.svg';

class ResultView {

  

    constructor(parentElement) {
        this.parentElement = parentElement;
        this.errorMessage = 'We could not find that recipe. Please try another one!';
    }

    _clearHTML() {
        this.parentElement.innerHTML = '';
    }

    _generateSpinner () {
       return  `
        <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
        </div> `;
    }

    _generetaErrorMessage() {
      return `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${this.errorMessage}</p>
    </div>`
    }

    _addToDOM(element) {
        this._clearHTML();
        this.parentElement.insertAdjacentHTML('afterbegin',element);
    }



    render(data) {
      if (!data || (Array.isArray(data) && data.length === 0)) {
        return this.renderError();
      }
        this._data = data;
        const markup = this._generateMarkup();
        this._addToDOM(markup); 
    }

    _generateMarkup() {
      return this._data.map(r => {
        const {publisher, image_url: imageUrl, title, id} = r;

        return `<li class="preview">
        <a class="preview__link preview__link--active" href="#${id}">
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

    renderSpinner() {
        this._addToDOM(this._generateSpinner());
      }
  
      renderError(){
        this._addToDOM(this._generetaErrorMessage());
      }

}



export default new ResultView(document.querySelector('.results'));