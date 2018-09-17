import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksApi from './BooksAPI';
import BooksGrid from './BooksGrid';

class SearchBooks extends Component {

  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    if (query) {
      this.setState({query});
      BooksApi.search(query.trim()).then((books) => {
        if (books.length > 0) {
          books = this.setShelves(books, this.props.shelfBooks);
        } else {
          books = [];
        }
        this.setState({books});
      });
    } else {
      this.clearQuery();
    }
  }

  /*
    Normally this would not be necessary because
    the API would update the books on the back end
    with user data.
  */
  setShelves = (stateBooks, propsBooks) => {
    for (let stateBook of stateBooks) {
      for (let propsBook of propsBooks) {
        if (stateBook.id === propsBook.id) {
          stateBook.shelf = propsBook.shelf;
          continue;
        }
      }
    }
    return stateBooks;
  }

  clearQuery = () => {
    this.setState({query: '', books: []});
  }

  render() {
    const {query, books} = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid handleUpdate={this.props.handleUpdate} books={books} />
        </div>
      </div>
    );
  }
}

export default SearchBooks;