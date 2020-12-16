class SearchView {
    constructor(parentElement) {
        this.parentElement = parentElement;
        this.errorMessage = 'We could not find that recipe. Please try another one!';
    }

    _clearInputValue() {
        this.parentElement.querySelector('.search__field').value = '';
    }

    getInputValue() {
        const query = this.parentElement.querySelector('.search__field').value;
        this._clearInputValue();

        return query;

    }

    addSearchHandler(handler) {
        this.parentElement.addEventListener('submit', (e) => {
            e.preventDefault();
           
            handler();
        })
    }
}


export default new SearchView(document.querySelector('.search'));