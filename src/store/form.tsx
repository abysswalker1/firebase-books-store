import { BookType } from './../types';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { RootState } from './store';
import { fireStoreBooksApi } from '../api/fireStoreApi';

const initialState = {
  isOpened: false,
  currentDocId: '',
  authors: [] as string[]
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addAuthor: (state, { payload }) => {
      payload && state.authors.push(payload)
    },
    removeAuthor: (state, action) => {
      state.authors.splice(action.payload, 1);
    }
  },
})

export const { addAuthor, removeAuthor } = formSlice.actions; 
export default formSlice.reducer;