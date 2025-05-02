import { AbstractComponent } from '../framework/view/abstact-component.js';

const createFilterTemplate = () => `
  <select class="book-filter">
    <option value="All">Все жанры</option>
    <option value="Fiction">Художественная</option>
    <option value="Science">Научная</option>
    <option value="Fantasy">Фантастика</option>
    <option value="Biography">Биография</option>
  </select>
`;

export class BookFilterComponent extends AbstractComponent {
  #handleFilterChange = null;

  constructor({ onFilterChange }) {
    super();
    this.#handleFilterChange = onFilterChange;
    this.element.addEventListener('change', this.#filterChangeHandler);
  }

  get template() {
    return createFilterTemplate();
  }

  #filterChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterChange(evt.target.value);
  };
}