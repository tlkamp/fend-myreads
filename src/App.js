import React from 'react';
import {Route, Link} from 'react-router-dom';
import * as BooksApi from './BooksAPI';
import './App.css';
import SearchBooks from './SearchBooks';
import BookShelf from './BookShelf';

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: ['Currently Reading', 'Want to Read', 'Read'],
  }

  componentDidMount() {
    BooksApi.getAll().then((books) => {
      this.setState({books});
    });
  }

  moveToShelf(book, shelf) {
    BooksApi.update(book, shelf).then(BooksApi.getAll).then((books) => {
      this.setState({books});
    });
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks shelfBooks={this.state.books} handleUpdate={this.moveToShelf.bind(this)} />
        )} />

        <Route path="/" exact render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.state.shelves.map((shelf) => (
                  <BookShelf key={shelf} handleUpdate={this.moveToShelf.bind(this)} shelfTitle={shelf} books={this.state.books} />
                ))}
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    );
  }
}

export default BooksApp;
