import React from 'react';
import './bookView.css';
import { BookType } from '../../store/booksListSlice';
//@ts-ignore
import bookCover from '../../assets/images/book-cover.webp';
import RatingStars from '../common/rating-stars/RatingStars';

type Props = {
  book: BookType
  title: string
}

const BookView: React.FC<Props> = ({book, title}) => {
  return (
    <div className='book-view'>
      <h1>Для вас</h1>
      <div className="book-view-grid">
        <div className="book-view__cover">
          <div className="book-view__image-wrap">
            <img src={bookCover} alt="" />
          </div>
        </div>
        <div className="book-view__info">
          <h3 className='book-view__name'>{book.name} {book.date && <span>({book.date} г.)</span>}</h3>
          <p className='book-view__authors'>{book.authors.join(', ')}</p>

          {book.ISBN && <p>ISBN: {book.ISBN}</p>}
          {book.rating && <div className='book-view__rating'><RatingStars rating={book.rating}/></div>} 
        </div>
      </div>
    </div>
  );
};

export default BookView;