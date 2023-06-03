import React from 'react';
import { BookType } from '../../../store/booksListSlice';
import './bookListItem.css';
import { booksApi, getBooks, toggleIsFetching } from '../../../store/booksListSlice';
import { useStoreDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { setDocId } from '../../../store/formSlice';
import RatingStars from '../../common/rating-stars/RatingStars';

type Props = {
  book: BookType 
}

const BookListItem: React.FC<Props> = ({ book, ...props }) => {
  const dispatch = useDispatch();
  const storeDispatch = useStoreDispatch();

  const setCurrentBookId = () => {
    dispatch(setDocId(book.id));
  }

  const deliteBook = () => {
    //@ts-ignore
    booksApi.delete(book.id);
    storeDispatch(getBooks());
  }

  return (
    <div className='book-list-item'>

      <div className="book-list-item__buttons">
        <button type='button' id='edit-book' onClick={setCurrentBookId}>
          <i className="bi bi-pencil"></i>
        </button>
        <button type='button' id='delite-book' onClick={deliteBook}>
          <i className="bi bi-trash"></i>
        </button>
      </div>

      {book.rating && <RatingStars rating={book.rating}/>}

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