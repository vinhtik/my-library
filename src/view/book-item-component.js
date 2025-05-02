import { AbstractComponent } from '../framework/view/abstact-component.js';

const createBookItemTemplate = (book) => `
  <li class="book-item" data-id="${book.id}">
    <div class="book-info">
      <h3>${book.title}</h3>
      <p>${book.author} • ${book.genre}</p>
    </div>
    <div class="book-actions" data-actions></div>
  </li>
`;

export class BookItemComponent extends AbstractComponent {
  #book = null;

  constructor({ book }) {
    super();
    this.#book = book;
  }

  get template() {
    return createBookItemTemplate(this.#book);
  }

  get actionsContainer() {
    return this.element.querySelector('[data-actions]');
  }
}