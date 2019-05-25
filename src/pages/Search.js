import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import * as BooksAPI from '../utils/BooksAPI'
import Book from '../Book'

class Search extends Component {
  state = {
    query: '',
    books: []
  }
  onInputChange = query => {
    this.updateQuery(query)
    query !== '' ? (
      this.searchBooks(query)
    ) : (
      this.clearBooks()
    )
  }
  updateQuery = (query) => {
    this.setState(() => ({
      query: query
    }))
  }
  clearBooks = () => (
    this.setState({books: {}})
  )
  maybeAssignShelfToBooks = books => {
    const mybooks = this.props.mybooks;
    const searchbooks = books;
    for (let searchbook of searchbooks) {
      for (let mybook of mybooks) {
        if (mybook.id === searchbook.id) {
          searchbook.shelf = mybook.shelf;
          this.setState((currState) => ({
            books:  [...currState, searchbook]
          }))
        }
      }
    }
    // All other books that user doesn't have on shelf.
    this.setState({books});
  }
  searchBooks = query => {
    BooksAPI.search(query)
      .then(books => {
        ! books.error
        ? this.maybeAssignShelfToBooks(books)
        : this.clearBooks()
      })
  }
  hideSelectedBook = selbook => {
    const books = this.state.books;
    const showBooks = books.filter(book => book.id !== selbook.id);
    this.setState({books: showBooks});
  }
  handleShelfChangeWrapper = (book, event) => {
    this.hideSelectedBook(book);
    this.props.handleShelfChange(book, event);
  }
  render() {
    const { query, books } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to='/'>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={query}
              placeholder="Search by title or author"
              onChange={(event) => this.onInputChange(event.target.value)}
              autoFocus
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.length > 0 && (
              books.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  handleShelfChange={this.handleShelfChangeWrapper}
                />
              </li>
            )))}
          </ol>
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  mybooks: PropTypes.array.isRequired,
  handleShelfChange: PropTypes.func.isRequired,
};

export default Search
