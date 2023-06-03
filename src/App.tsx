import './App.css';
import { useEffect } from 'react';
import BookForm from './components/book-form/BookForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, useStoreDispatch } from './store/store';
import { getBooks, toggleIsFetching } from './store/booksListSlice';
import Loader from './components/common/loader/loader';
import { showForm, setCurrentDoc } from './store/formSlice';
import findById from './utils/findById';
import { Button } from '@mui/material';
import Compilation from './components/compilation/Compilation';
import { filterByDate, getRecomended } from './utils/filterBooksToCompilation';
import BookView from './components/book-view/BookView';

function App() {
  const booksList = useSelector((state: RootState) => state.books.list);
  const isFetching = useSelector((state: RootState) => state.books.isFetching);
  const formIsOpened = useSelector((state: RootState) => state.form.isOpened);
  const currentDocId = useSelector((state: RootState) => state.form.currentDocId);
  const recomendedBook = getRecomended(booksList);
  const storeDispatch = useStoreDispatch();
  const dispatch = useDispatch();

  const years = (function () {
    let dateOptions = booksList.filter((book) => book.date).map((book) => book.date);

    //@ts-ignore
    return [...new Set(dateOptions)];
  })();

  useEffect(() => {
    dispatch(toggleIsFetching(true));
    storeDispatch(getBooks());
  }, []);

  useEffect(() => {
    const currentDoc = findById(booksList, currentDocId);
    if (currentDoc) {
      dispatch(
        setCurrentDoc({
          name: currentDoc.name,
          authors: currentDoc.authors,
          date: currentDoc.date,
        }),
      );
    }
  }, [currentDocId]);

  return (
    <div className="app">
      <div className="app__container">
        {formIsOpened ? (
          <BookForm />
        ) : (
          <Button className="add-book-btn" onClick={() => dispatch(showForm())}>
            Добавить книгу <i className="bi bi-plus-lg"></i>
          </Button>
        )}
        {isFetching ? (
          <Loader />
        ) : (
          <>
            {recomendedBook && <BookView book={recomendedBook} title="Для вас" />}
            {years.map((item) => (
              <Compilation title={item + ''} booksList={filterByDate(booksList, item)} />
            ))}
            <Compilation title={'Остальные'} booksList={filterByDate(booksList)} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
