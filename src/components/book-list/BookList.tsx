import React from 'react';
import './bookList.css';
import { BookType } from '../../store/booksListSlice';
import BookListItem from './book-list-item/BookListItem';

type Props = {
  books: BookType[]
}

const BookList: React.FC<Props> = (props) => {
  return (
    <div className="app__book-list">
      {props.books.map(book => <BookListItem book={book} />)}
    </div>
  );
};

export default BookList;