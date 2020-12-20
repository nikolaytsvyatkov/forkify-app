import View from './View';

class UploadRecipeView extends View {
  _message = 'Recipe was successfully uploaded :)';

  _overlay = document.querySelector('.overlay');
  _closeButton = document.querySelector('.btn--close-modal');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _window = document.querySelector('.add-recipe-window');
  _uploadForm = document.querySelector('.upload');
  parentElement = document.querySelector('.upload');

  constructor() {
    super();
    this._showUploadWindow();
    this._closeWindow();
  }

  _showUploadWindow() {
    this._btnOpen.addEventListener('click', () => {
      this.toggleClass(this._overlay, 'hidden');
      this.toggleClass(this._window, 'hidden');
    });
  }

  _closeWindow() {
    this._closeButton.addEventListener('click', () => {
      console.log('asdasdasd');
      this.toggleClass(this._overlay, 'hidden');
      this.toggleClass(this._window, 'hidden');
    });
  }

  uploadHandler(handler) {
    this._uploadForm.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(this._uploadForm);
      const dataArr = [...data];
      const objectToSend = Object.fromEntries(dataArr);
      console.log(this);
      handler(objectToSend);
    });
  }
}

export default new UploadRecipeView(
  document.querySelector('.add-recipe-window')
);
