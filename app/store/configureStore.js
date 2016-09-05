import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const nextRootReducer = require('../reducers');

export default function configureStore(initialState) {
    const logger = createLogger();
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, promise, logger)
    );

    if (module.hot) {
        // Enable hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
