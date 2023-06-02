import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import booksList from './booksList';
import form from './form';

export const store = configureStore({
  reducer: {
    books: booksList,
    form: form
  }
})

export const useStoreDispatch = () => useDispatch<typeof store.dispatch>();
export type RootState = ReturnType<typeof store.getState>;
