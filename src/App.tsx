import './App.css';
import { useEffect } from 'react';
import { BookType } from './types';
import BookForm from './components/book-form/BookForm';
import BookListItem from './components/book-list-item/BookListItem';
import { useSelector } from 'react-redux';
import { RootState, useStoreDispatch } from './store/store';
import { getBooks } from './store/booksList';
import Loader from './components/common/loader/loader';

function App() {
  const booksList = useSelector((state: RootState) => state.books.list);
  const isFetching = useSelector((state: RootState) => state.books.isFetching)
  const dispatch = useStoreDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, []);

  return (
    <div className="app">
      <div className="app__container">

        <BookForm />

        <div className="app__book-list">
          { 
          isFetching 
            ? <Loader /> 
            : booksList.map(book => <BookListItem book={book} />) 
          }
        </div>

      </div>
    </div>
  );
}

export default App;
