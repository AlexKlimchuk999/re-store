import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/app/app'
import ErrorBoundry from './components/error-boundry/error-boundry';
import BookstoreService from './services/bookstore-service'
import { BookstoreServiceProvider } from './components/bookstore-service-context'

import store from './store';

const bookstoreService = new BookstoreService()

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <ErrorBoundry>
            <BookstoreServiceProvider value={bookstoreService}>
                <Router>
                    <App />
                </Router>
            </BookstoreServiceProvider>
        </ErrorBoundry>
    </Provider>
);
