import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './reducers';

const store = configureStore({
  reducer: {
    books: booksReducer
  }
});

export default store;