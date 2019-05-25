import React, { Component } from 'react'
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';
import Header from './components/Header'
import { SHELVES } from './data/Shelves'

class MyBooks extends Component {

  getBooksByShelf = (shelf, books) => {
    return books.filter(book => (book.shelf === shelf));
  }

  getShowableShelves = shelves => {
    return SHELVES.slice(0, SHELVES.length-1);
  }
  
  render() {
    const { handleShelfChange, books } = this.props

    return (
      <div className="app">
        <div className="list-books">
          <Header />
          {this.getShowableShelves().map((shelf) => {
              const booksByShelf = this.getBooksByShelf(shelf.value, books)
              return (
                <BookShelf
                  shelf={shelf.text}
                  books={booksByShelf}
                  handleShelfChange={handleShelfChange}
                />
              )
            })
          }
          <div className="list-books-content">
          </div>
        </div>
      </div>
    )
  }
}

MyBooks.propTypes = {
  books: PropTypes.array.isRequired,
  handleShelfChange: PropTypes.func.isRequired,
};

export default MyBooks
