import { books } from '../mock/books.js';

export default class BookModel {
    constructor() {
        this.books = [...books];
    }

    getAllBooks() {
        return this.books;
    }

    getBooksByGenre(genre) {
        return genre === 'All' 
            ? this.books 
            : this.books.filter(book => book.genre === genre);
    }

    addBook(bookData) {
        const newBook = {
            ...bookData,
            id: Date.now().toString()
        };
        this.books.push(newBook);
        return newBook;
    }

    deleteBook(id) {
        this.books = this.books.filter(book => book.id !== id);
    }
}