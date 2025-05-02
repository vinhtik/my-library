import { AbstractComponent } from '../framework/view/abstact-component.js';

const createListTemplate = () => `
  <div class="book-list-container">
    <h2>Список книг</h2>
    <ul class="book-list"></ul>
  </div>
`;

export class BookListComponent extends AbstractComponent {
  constructor() {
    super();
  }

  get template() {
    return createListTemplate();
  }

  get listElement() {
    return this.element.querySelector('.book-list');
  }
}