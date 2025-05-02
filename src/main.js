import BookModel from './model/book-model.js'
import { BookPresenter } from './presenter/book-presenter.js';

document.addEventListener('DOMContentLoaded', () => {
  const model = new BookModel();
  const appContainer = document.querySelector('.container');
  
  new BookPresenter({
    model,
    container: appContainer
  });
});