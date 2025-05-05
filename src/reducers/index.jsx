import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books:[],
  loading: true,
  error: null,
  cartItems: [],
  orderTotal: 220
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
    booksError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    bookAddedToCart: (state, action) => {
      const bookId = action.payload;
      const book = state.books.find(book => book.id === bookId);
      const itemIndex = state.cartItems.findIndex(item => item.id === bookId);
    
      if (itemIndex >= 0) {
        // Книга уже есть в корзине — обновляем count и total
        state.cartItems[itemIndex].count += 1;
        state.cartItems[itemIndex].total += book.price;
      } else {
        // Книги нет — добавляем
        state.cartItems.push({
          id: book.id,
          title: book.title,
          count: 1,
          total: book.price,
        });
      }
    
      // Обновляем итог
      state.orderTotal = state.cartItems.reduce((sum, item) => sum + item.total, 0);
    
    },
    removeCartItem: (state, action) => {
      const bookId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== bookId);
      state.orderTotal = state.cartItems.reduce((sum, item) => sum + item.total, 0);
    },
    decreaseCartItem: (state, action) => {
      const bookId = action.payload;
      const itemIndex = state.cartItems.findIndex(item => item.id === bookId);
    
      if (itemIndex >= 0) {
        const item = state.cartItems[itemIndex];
        item.count -= 1;
        item.total -= state.books.find(book => book.id === bookId).price;
    
        if (item.count <= 0) {
          state.cartItems.splice(itemIndex, 1); // полностью удаляем, если count 0
        }
      }
    
      state.orderTotal = state.cartItems.reduce((sum, item) => sum + item.total, 0);
    },
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
export const { booksRequested, booksLoaded, booksError, bookAddedToCart, decreaseCartItem, removeCartItem} = booksSlice.actions;

export {
  fetchBooks,
}