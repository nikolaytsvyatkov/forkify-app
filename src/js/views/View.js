import icons from './../../img/icons.svg';

export default class View {
    constructor(parentElement) {
        this.parentElement = parentElement;
        
    }

    render(data, render = true) {
        if (!data || (Array.isArray(data) && data.length === 0)) {
          return this.renderError();
        }
        
        
        this._data = data;
        
        
        const markup = this._generateMarkup();
       
        if (!render) return markup;
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

      update(data) {
        this._data = data;
        
        const newMarkup = this._generateMarkup();
        
        const newDOM = document.createRange().createContextualFragment(newMarkup);
        
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const curElements = Array.from(this.parentElement.querySelectorAll('*'));
    
        newElements.forEach((newEl, i) => {
          const curEl = curElements[i];
          // console.log(curEl, newEl.isEqualNode(curEl));
    
          // Updates changed TEXT
          if (
            !newEl.isEqualNode(curEl) &&
            newEl.firstChild?.nodeValue.trim() !== ''
          ) {
            // console.log('💥', newEl.firstChild.nodeValue.trim());
            curEl.textContent = newEl.textContent;
          }
    
          // Updates changed ATTRIBUES
          if (!newEl.isEqualNode(curEl))
            Array.from(newEl.attributes).forEach(attr =>
              curEl.setAttribute(attr.name, attr.value)
            );
        });
      }
}


