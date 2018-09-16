import React, { Component } from 'react';
import ShelfChanger from './ShelfChanger';

class Book extends Component {

    render() {
        // Some books don't have authors or covers
        const authors = this.props.book.authors ? this.props.book.authors.join(", ") : "Unknown";
        const thumbnail = this.props.book.imageLinks && this.props.book.imageLinks.thumbnail ? this.props.book.imageLinks.thumbnail : "";

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${thumbnail}")` }}></div>
                    <ShelfChanger book={this.props.book} handleUpdate={this.props.handleUpdate}/>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        );
    }
}

export default Book;