import View from './View';
import icons from './../../img/icons.svg';

class PaginationView extends View {
  _generateMarkup() {
    const currentPage = this._data.page;
    const numOfPages = Math.ceil(
      this._data.results.length / this._data.numPerPage
    );
    console.log(this._data);
    console.log(numOfPages);

    if (currentPage === 1 && numOfPages > 1) {
      return `
          <button data-go-to=${
            currentPage + 1
          } class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }

    if (currentPage === numOfPages && numOfPages > 1) {
      return `<button data-go-to=${
        currentPage - 1
      } class="btn--inline pagination__btn--prev">
            <span>Page ${currentPage - 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
          </button>`;
    }

    if (currentPage < numOfPages) {
      return `
            <button data-go-to="${
              currentPage - 1
            }" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${currentPage - 1}</span>
            </button>
            <button data-go-to="${
              currentPage + 1
            }" class="btn--inline pagination__btn--next">
              <span>Page ${currentPage + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </button>
          `;
    }

    return '';
  }

  addClickHandler(handler) {
    this.parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      console.log(btn.dataset.goTo);
      handler(+btn.dataset.goTo);
    });
  }
}

export default new PaginationView(document.querySelector('.pagination'));
