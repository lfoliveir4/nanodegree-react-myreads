import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

// Will be a functional stateless Component.
// Props will be each bookshelf given from the parent component.
// Each bookshelf will have a collection of books.

const BookShelf = props => {
  const { shelf, books, handleShelfChange} = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">

          {books.map((book) => (
            <li key={book.id}>
              <Book
                book={book}
                handleShelfChange={handleShelfChange}
              />
            </li>
          ))}

        </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  shelf: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  handleShelfChange: PropTypes.func.isRequired,
};

export default BookShelf
