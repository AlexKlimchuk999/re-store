import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookList: {
    books: [],
    loading: true,
    error: null,
  },
  shoppingCart: {
    cartItems: [],
    orderTotal: 0
  }
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    booksRequested: (state) => {
      state.bookList.loading = true;
      state.bookList.error = null;
    },
    booksLoaded: (state, action) => {
      state.bookList.books = action.payload;
      state.bookList.loading = false;
      state.bookList.error = null;
    },
    booksError: (state, action) => {
      state.bookList.error = action.payload;
      state.bookList.loading = false;
    },
    bookAddedToCart: (state, action) => {
      const bookId = action.payload;
      const book = state.bookList.books.find(book => book.id === bookId);
      const itemIndex = state.shoppingCart.cartItems.findIndex(item => item.id === bookId);

      if (itemIndex >= 0) {
        const item = state.shoppingCart.cartItems[itemIndex];
        item.count += 1;
        item.total += book.price;
      } else {
        state.shoppingCart.cartItems.push({
          id: book.id,
          title: book.title,
          count: 1,
          total: book.price,
        });
      }

      state.shoppingCart.orderTotal = state.shoppingCart.cartItems.reduce(
        (sum, item) => sum + item.total, 0
      );
    },
    removeCartItem: (state, action) => {
      const bookId = action.payload;
      state.shoppingCart.cartItems = state.shoppingCart.cartItems.filter(item => item.id !== bookId);
      state.shoppingCart.orderTotal = state.shoppingCart.cartItems.reduce(
        (sum, item) => sum + item.total, 0
      );
    },
    decreaseCartItem: (state, action) => {
      const bookId = action.payload;
      const itemIndex = state.shoppingCart.cartItems.findIndex(item => item.id === bookId);

      if (itemIndex >= 0) {
        const item = state.shoppingCart.cartItems[itemIndex];
        const book = state.bookList.books.find(book => book.id === bookId);

        item.count -= 1;
        item.total -= book.price;

        if (item.count <= 0) {
          state.shoppingCart.cartItems.splice(itemIndex, 1);
        }
      }

      state.shoppingCart.orderTotal = state.shoppingCart.cartItems.reduce(
        (sum, item) => sum + item.total, 0
      );
    },
  }
});

const fetchBooks = (bookstoreService, dispatch) => () => {
  dispatch(booksRequested());
  bookstoreService.getBooks()
    .then((data) => dispatch(booksLoaded(data)))
    .catch((err) => dispatch(booksError(err)));
};

export default booksSlice.reducer;

export const {
  booksRequested,
  booksLoaded,
  booksError,
  bookAddedToCart,
  removeCartItem,
  decreaseCartItem
} = booksSlice.actions;

export {
  fetchBooks,
};
