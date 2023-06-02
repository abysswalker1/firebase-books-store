import React from 'react';
import { BookType } from '../../types';
import './bookListItem.css';

type Props = {
  book: BookType
  
}

const BookListItem: React.FC<Props> = ({ book, ...props }) => {
  return (
    <div className='book-list-item'>
      <div className="book-list-item__image-wrap">
        <img src="" alt="" />
      </div>
      <div className="book-list-item__info">
        <h3>{book.name}</h3>
        <p>{book.authors.join(', ')}</p>
      </div>  
    </div>
  );
};

export default BookListItem;