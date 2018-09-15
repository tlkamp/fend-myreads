import React from 'react'
import { Link } from 'react-router-dom';
import * as BooksApi from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks';
import ShelfChanger from './ShelfChanger';
import BookShelf from './BookShelf';

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: ['Currently Reading', 'Want to Read', 'Read'],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount() {
    BooksApi.getAll().then((books) => {
      this.setState({books})
    });
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks books={this.state.books}/>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.state.shelves.map((shelf) => (
                  <BookShelf key={shelf} shelfTitle={shelf} books={this.state.books}/>
                ))}
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
              {/* <Link to="/search">Add a book</Link> */}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
