import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';

class SearchBooks extends Component {

    state = {
        query: '',
    }

    updateQuery = (query) => {
        this.setState({
            query: query.trim()
        });
    }

    render() {
        let booksToShow = '';

        const { books } = this.props;
        const { query } = this.state;

        if (query) {
            const match = RegExp(escapeRegExp(query), 'i');
            booksToShow = books.filter((book) => match.test(book.author) || match.test(book.title));
        } else {
            booksToShow = books;
        }

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                          value={this.state.query}
                          onChange={(event) => this.updateQuery(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {booksToShow.map((book) => (
                            <li key={book.id} className="book"></li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchBooks;