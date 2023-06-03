import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import booksList from './booksListSlice';
import form from './formSlice';

export const store = configureStore({
  reducer: {
    books: booksList,
    form: form
  }
})

export const useStoreDispatch = () => useDispatch<typeof store.dispatch>();
export type RootState = ReturnType<typeof store.getState>;
