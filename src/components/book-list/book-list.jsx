import React, { Component } from 'react';
import BookListItem from '../book-list-item/book-list-item';
import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
import { compose } from '../../utils';
import { fetchBooks, bookAddedToCart} from '../../reducers';
import Spinner from '../spinner/spiner';
import ErrorIndicator from '../error-indicator/error-indicator';

import './book-list.css';

const BookList = ({books, onAddedToCart}) => {
    return (
        <ul className='books-list'> 
            {
                books.map((book) => {
                    return (
                        <li key={book.id}>
                            <BookListItem 
                                onAddedToCart={() => onAddedToCart(book.id)}
                                book={book}/>
                        </li>
                    )
                })
            }
        </ul>
    )
}

class BookListContainer extends Component {

    componentDidMount() {
       this.props.fetchBooks();
    }

    render() {
        const { books, loading, error, onAddedToCart } = this.props;

        if(loading) {
            return <Spinner/>
        }

        if(error) {
            return <ErrorIndicator />
        }

        return <BookList books={books} onAddedToCart={onAddedToCart}/>
      
    }
 
}

const mapStateToProps = (state) => {
    return {
      books: state.books.bookList.books,
      loading: state.books.bookList.loading,
      error: state.books.bookList.error
    };
};

const mapDispatchToProps = (dispatch, {bookstoreService}) => {
    return {
        fetchBooks: fetchBooks(bookstoreService, dispatch),
        onAddedToCart: (id) => dispatch(bookAddedToCart(id)),
    }
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps,mapDispatchToProps)
)(BookListContainer);
