import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksApi from './BooksAPI';
import BooksGrid from './BooksGrid';

class SearchBooks extends Component {

    state = {
        query: '',
        books: []
    }

    updateQuery = (query) => {
        this.setState({
            query: query.trim()
        });
    }

    clearQuery = (query) => {
        this.setState({query: '', books: []})
    }

    componentDidUpdate() {
        if(this.state.query) {
            BooksApi.search(this.state.query).then((results) => this.setState({books: results}));
        }
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
                    <BooksGrid books={books}/>
                </div>
            </div>
        );
    }
}

export default SearchBooks;