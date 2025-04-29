import React, { Component } from 'react';
import BookListItem from '../book-list-item/book-list-item';
import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc'
import { compose } from '../../utils';
import './book-list.css'
import { bookLoaded } from '../../reducers';

class BookList extends Component {

    componentDidMount() {
        const { bookstoreService } = this.props;
        const data = bookstoreService.getBooks();

        this.props.bookLoaded(data)

        console.log(data)
    }

    render() {
        const { books } = this.props;
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
 
}

const mapStateToProps = (state) => {
    return {
      books: state.books.books
    };
};


const mapDispatchToProps = {
    bookLoaded
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps,mapDispatchToProps)
)(BookList);
