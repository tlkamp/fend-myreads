import React, { Component } from 'react';
import ShelfChanger from './ShelfChanger';

class Book extends Component {

    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.book.imageLinks.thumbnail}")` }}></div>
                    <ShelfChanger book={this.props.book} handleUpdate={this.props.handleUpdate}/>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{this.props.book.authors.join(", ")}</div>
            </div>
        );
    }
}

export default Book;