import React, { Component } from 'react';
import BookListItem from '../book-list-item/book-list-item';
import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
import { compose } from '../../utils';
import { fetchBooks } from '../../reducers';
import Spinner from '../spinner/spiner';
import ErrorIndicator from '../error-indicator/error-indicator';

import './book-list.css';

const BookList = ({books}) => {
    return (
        <ul className='books-list'> 
            {
                books.map((book) => {
                    return (
                        <li key={book.id}><BookListItem book={book}/></li>
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
        const { books, loading, error } = this.props;

        if(loading) {
            return <Spinner/>
        }

        if(error) {
            return <ErrorIndicator />
        }

        return <BookList books={books} />
      
    }
 
}

const mapStateToProps = (state) => {
    return {
      books: state.books.books,
      loading: state.books.loading,
      error: state.books.error
    };
};

const mapDispatchToProps = (dispatch, {bookstoreService}) => {
    return {
        fetchBooks: fetchBooks(bookstoreService, dispatch)
    }
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps,mapDispatchToProps)
)(BookListContainer);
