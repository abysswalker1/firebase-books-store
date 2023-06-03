import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { fireStoreBooksApi } from '../api/fireStoreApi';

export type BookType = {
  id: string
  name: string
  authors: string[],
  date?: number,
  ISBN?: string,
  rating?: number
}

const initialState = {
  list: [] as BookType[],
  isFetching: false 
}

export const booksApi = fireStoreBooksApi();

export const getBooks = createAsyncThunk( 'getBooks', booksApi.get);

const booksListSlice = createSlice({
  name: 'booksList',
  initialState,
  reducers: {
    toggleIsFetching: (state, {payload}) => {
      state.isFetching = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.list = action.payload;
      state.isFetching = false;
    })
  }
})

export const {toggleIsFetching} = booksListSlice.actions;

export default booksListSlice.reducer;