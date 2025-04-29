import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books:[]
}


const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    bookLoaded: (state, action) => {
      state.books = action.payload;
    }
  }
});

// экспортируем редюсер
export default booksSlice.reducer;

// экспортируем экшены
export const { bookLoaded } = booksSlice.actions;
