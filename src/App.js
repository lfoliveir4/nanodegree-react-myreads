import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI'
import Search from './pages/Search'
import MyBooks from './MyBooks'


class BooksApp extends Component {
  state = {
    books: []
  }

  getBooks = () => (
    BooksAPI.getAll()
      .then((books) => {
        this.setState({books});
      })
  )
  componentDidMount() {
    this.getBooks();
  }

  handleShelfChange = (book, event) => {
    const shelf = event.target.value;
    BooksAPI.update(book, shelf)
      .then((res) => {
        this.getBooks();
      })
  }


  render() {
    const books = this.state.books;

    return (
      <Router>
        <Switch>
          <Route exact path='/' render={() => (
            <MyBooks
              handleShelfChange={this.handleShelfChange}
              books={books}
            />
          )} />
          <Route path='/search' render={() => (
            <Search
              mybooks={books}
              handleShelfChange={this.handleShelfChange}
            />
          )} />
        </Switch>
      </Router>
    )
  }
}

export default BooksApp
