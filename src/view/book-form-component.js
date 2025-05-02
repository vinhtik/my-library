import { AbstractComponent } from '../framework/view/abstact-component.js';

const createFormTemplate = () => `
  <form class="book-form">
    <h2>Добавить книгу</h2>
    <input type="text" class="book-title" placeholder="Название" required>
    <input type="text" class="book-author" placeholder="Автор" required>
    <select class="book-genre" required>
      <option value="">Выберите жанр</option>
      <option value="Fiction">Художественная</option>
      <option value="Science">Научная</option>
      <option value="Fantasy">Фантастика</option>
      <option value="Biography">Биография</option>
    </select>
    <button type="submit">Добавить</button>
  </form>
`;

export class BookFormComponent extends AbstractComponent {
  #handleSubmit = null;

  constructor({ onSubmit }) {
    super();
    this.#handleSubmit = onSubmit;
    this.element.addEventListener('submit', this.#formSubmitHandler);
  }

  get template() {
    return createFormTemplate();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    const formData = this.#getFormData();
    if (formData.title && formData.author && formData.genre) {
      this.#handleSubmit(formData);
      this.#resetForm();
    }
  };

  #getFormData() {
    return {
      title: this.element.querySelector('.book-title').value,
      author: this.element.querySelector('.book-author').value,
      genre: this.element.querySelector('.book-genre').value
    };
  }

  #resetForm() {
    this.element.reset();
  }
}