import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksApi from './BooksAPI';
import BooksGrid from './BooksGrid';

class SearchBooks extends Component {

    state = {
        query: '',
        books: []
    }

    updateQuery = (query) => {
        if (query) {
            this.setState({query: query.trim()})
            BooksApi.search(query.trim()).then((books) => {
                // Calling .map on an array with no items causes the function to be 'undefined'
                const newResults = books.length > 1 ? books : [];
                this.setState({books: newResults})
            })
        } else {
            this.clearQuery();
        }
    }

    clearQuery = () => {
        this.setState({query: '', books: []})
    }

    render() {
        const { query, books } = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                          value={query}
                          onChange={(event) => this.updateQuery(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <BooksGrid handleUpdate={this.props.handleUpdate} books={books}/>
                </div>
            </div>
        );
    }
}

export default SearchBooks;