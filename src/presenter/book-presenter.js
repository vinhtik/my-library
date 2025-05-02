import { render } from '../framework/render.js';
import { BookFilterComponent } from '../view/book-filter-component.js';
import { BookFormComponent } from '../view/book-form-component.js';
import { BookListComponent } from '../view/book-list-component.js';
import { BookItemComponent } from '../view/book-item-component.js';
import { DeleteButtonComponent } from '../view/delete-button-component.js';
import BookModel from '../model/book-model.js';

export class BookPresenter {
  #model = null;
  #container = null;
  #filterComponent = null;
  #formComponent = null;
  #listComponent = null;
  #bookItemComponents = [];

  constructor({ model, container }) {
    this.#model = new BookModel();
    this.#container = container;
    this.#init();
  }

  #init() {
    this.#renderComponents();
    this.#updateBookList();
  }

  #renderComponents() {
    this.#listComponent = new BookListComponent();
    render(this.#listComponent, this.#container.querySelector('.list-container'));

    this.#filterComponent = new BookFilterComponent({
      onFilterChange: this.#handleFilterChange.bind(this)
    });
    render(this.#filterComponent, this.#container.querySelector('.filter-container'));

    this.#formComponent = new BookFormComponent({
      onSubmit: this.#handleFormSubmit.bind(this)
    });
    render(this.#formComponent, this.#container.querySelector('.form-container'));

  }

  #renderBooks(books) {
    const listElement = this.#listComponent.listElement;
    listElement.innerHTML = '';
    this.#bookItemComponents = [];

    books.forEach(book => {
      const bookItemComponent = new BookItemComponent({ book });
      const bookElement = bookItemComponent.element;
      listElement.appendChild(bookElement);

      const deleteButtonComponent = new DeleteButtonComponent({
        onClick: () => this.#handleDeleteBook(book.id)
      });
      render(deleteButtonComponent, bookItemComponent.actionsContainer);

      this.#bookItemComponents.push({
        bookItem: bookItemComponent,
        deleteButton: deleteButtonComponent
      });
    });
  }

  #handleFormSubmit(formData) {
    this.#model.addBook(formData);
    this.#updateBookList();
  }

  #handleDeleteBook(bookId) {
    this.#model.deleteBook(bookId);
    this.#updateBookList();
  }

  #handleFilterChange(genre) {
    this.#updateBookList(genre);
  }

  #updateBookList(genre = 'All') {
    const books = this.#model.getBooksByGenre(genre);
    this.#renderBooks(books);
  }
}