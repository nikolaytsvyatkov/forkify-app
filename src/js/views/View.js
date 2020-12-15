import icons from './../../img/icons.svg';

export default class View {
    constructor(parentElement) {
        this.parentElement = parentElement;
        
    }

    render(data) {
        if (!data || (Array.isArray(data) && data.length === 0)) {
          return this.renderError();
        }
        
        
        this._data = data;
        
  
        const markup = this._generateMarkup();
        this._addToDOM(markup);
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

    

    renderSpinner() {
        this._addToDOM(this._generateSpinner());
      }
  
      renderError(){
        this._addToDOM(this._generetaErrorMessage());
      }

}


