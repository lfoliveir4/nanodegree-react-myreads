import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Will be a functional stateless Component.
// Props will contain object data about the book and also a handler for selecting
// the which bookshelf it belongs to.

// Only a single book object will be passed.

class Book extends Component {
  truncateTitle = title => {
    const maxLength = 30;
    let toReturn = '';
    title.length < maxLength ? (
      toReturn  = title
    ) : (
      toReturn = `${title.slice(0,maxLength)}...`
    )
    return toReturn;
  }
  maybeGetCoverImageLink = imageLinks => {
    for (let link in imageLinks) {
      if(imageLinks[link]) return imageLinks[link];
    }
    return ''
  }

  
  render() {
    const { book, handleShelfChange } = this.props;
    const title = this.truncateTitle(book.title);
    const coverImageLink = this.maybeGetCoverImageLink(book.imageLinks);
    const authors = book.authors;

    return (
      <div className="book">
        <div className="book-top">
          <BookCover book={book} coverImageLink={coverImageLink} />
          <ShelfSelector book={book} handleShelfChange={handleShelfChange} />
        </div>
        <BookTitle title={title} />
        <Authors authors={authors} />
      </div>
    )
  }
}

const ShelfSelector = props => {
  // The option "None" should be selected if a book has not been assigned to a shelf.

  const { book, handleShelfChange } = props;

  return (
    <div className="book-shelf-changer">
      <select
        value={book.shelf}
        onChange={(event) => (handleShelfChange(book, event))}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Finished Reading</option>
        <option value="none" selected={!book.shelf}>None</option>
      </select>
    </div>
  )
}
const BookCover = props => {
  const { coverImageLink } = props;
  return (
    <div className="book-cover"
      style={
        { width: 128,
          height: 193,
          backgroundImage: `url(${coverImageLink})` }
      }>
    </div>
  )
}
const BookTitle = props => {
  const { title } = props;
  return (
    <div className="book-title">
      {title}
    </div>
  )
}
const Authors = props => {
  const { authors } = props;
  return (
    <div className="book-authors">
      {authors ? (
        authors.map((author) => (
          <div key={author}>{author}</div>
        ))
      ) : (
        <p>Author Unknown</p>
      )}
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  handleShelfChange: PropTypes.func.isRequired,
}

// const coverImageLink = book.imageLinks.thumbnail

export default Book
