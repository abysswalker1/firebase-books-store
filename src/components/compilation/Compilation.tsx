import React from 'react';
import BookList from '../book-list/BookList';
import { BookType } from '../../store/booksListSlice';
import './compilation.css';

type Props = {
  title: string
  booksList: BookType[]
}

const Compilation: React.FC<Props> = (props) => {
  return (
    <div className='compilation'>
      <h3>{props.title}</h3>
      <BookList books={props.booksList}/>
    </div>
  );
};

export default Compilation;