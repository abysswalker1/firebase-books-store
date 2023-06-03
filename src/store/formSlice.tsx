import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { RootState } from './store';
import { fireStoreBooksApi } from '../api/fireStoreApi';
import { useSelector } from 'react-redux';

export interface RequestDocumentData {
  name: string
  authors: string[]
  date: number
}

const initialState = {
  isOpened: false,
  currentDocId: '',
  currentDoc: {
    name: '',
    authors: [],
    date: new Date().getFullYear()
  } as RequestDocumentData
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    showForm: (state) => {
      state.isOpened = true;
    },
    setDocId: (state, {payload}) => {
      state.currentDocId = payload;
    },
    setCurrentDoc: (state, action) =>{
      console.log(action.payload)
      state.currentDoc = action.payload;
      state.isOpened = true;
    },
    addAuthor: (state, { payload }) => {
      payload && state.currentDoc.authors.push(payload);
    },
    removeAuthor: (state, {payload}) => {
      state.currentDoc.authors.splice(payload, 1);
    },
    clearAndCloseForm: () => initialState
  },
})

export const { addAuthor, removeAuthor, setDocId, showForm, clearAndCloseForm, setCurrentDoc } = formSlice.actions; 
export default formSlice.reducer;