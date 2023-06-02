import './App.css';
import { useEffect } from 'react';
import BookForm from './components/book-form/BookForm';
import BookListItem from './components/book-list-item/BookListItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, useStoreDispatch } from './store/store';
import { getBooks, toggleIsFetching } from './store/booksList';
import Loader from './components/common/loader/loader';
import { showForm, setCurrentDoc } from './store/form';
import findById from './utils/findById';
import { Button } from '@mui/material';

function App() {
  const booksList = useSelector((state: RootState) => state.books.list);
  const isFetching = useSelector((state: RootState) => state.books.isFetching);
  const formIsOpened = useSelector((state: RootState) => state.form.isOpened);
  const currentDocId = useSelector((state: RootState) => state.form.currentDocId);
  const storeDispatch = useStoreDispatch();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleIsFetching(true))
    storeDispatch(getBooks())
  }, []);

  useEffect(() => {
    const currentDoc = findById(booksList, currentDocId);
    if(currentDoc){
      dispatch(setCurrentDoc({name: currentDoc.name, authors: currentDoc.authors, date: currentDoc.date}))
    }
  }, [currentDocId])

  return (
    <div className="app">
      <div className="app__container">

        { formIsOpened 
          ? <BookForm /> 
          : <Button className='add-book-btn' onClick={() => dispatch(showForm())} variant="contained">
              Добавить книгу
            </Button> 
        } 

        <div className="app__book-list">
          { isFetching ? <Loader />  : booksList.map(book => <BookListItem book={book} />) }
        </div>

      </div>
    </div>
  );
}

export default App;
