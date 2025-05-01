import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books:[],
  loading: true,
  error: null
}


const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    booksRequested: (state) => {
      state.loading = true;
      state.error = null;
    },
    booksLoaded: (state, action) => {
      state.books = action.payload;
      state.loading = false;
      state.error = null;
    },
    booksError: (state , action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

const fetchBooks = (bookstoreService, dispatch) => () => {
  dispatch(booksRequested());
  bookstoreService.getBooks()
      .then((data) => dispatch(booksLoaded(data)))
      .catch((err) => dispatch(booksError(err)))
}

// экспортируем редюсер
export default booksSlice.reducer;

// экспортируем экшены
export const { booksRequested, booksLoaded, booksError } = booksSlice.actions;

export {
  fetchBooks
}