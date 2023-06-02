import { BookType } from './../types';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { RootState } from './store';
import { fireStoreBooksApi } from '../api/fireStoreApi';

const initialState = {
  list: [] as BookType[],
  isFetching: false 
}

const api = fireStoreBooksApi();

export const getBooks = createAsyncThunk( 'getBooks', api.get);

const booksListSlice = createSlice({
  name: 'booksList',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.isFetching = false
      state.list = action.payload
    })
    builder.addCase(getBooks.pending, (state, action) => {
      state.isFetching = true
    })
  }
})

export default booksListSlice.reducer;