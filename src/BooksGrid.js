import React, { Component } from 'react';

class BooksGrid extends Component {

    render() {
        return (
            <ol className="books-grid">
                {this.props.books.map((book) => (
                    <li key={book.id}>
                        <Book book={book} />
                    </li>
                ))}
            </ol>
        );
    }
}

export default BooksGrid;