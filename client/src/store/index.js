import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import rootSaga from './rootSaga';

/*
    Create an array to hold any middleware we want to use.
    Since I will also want to include the saga middleware I can
    go ahead and add that now.
    
    create the saga middleware
*/
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

/*
    Since I don't want to include the logger middleware in
    production I can check on my environment and only add it
    if I'm in development.
    
    create the logger middleware
*/
const loggerMiddleware = createLogger();

if (process.env.NODE_ENV === 'development') {
    middlewares.push(loggerMiddleware);
}

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
);

// then run the saga
sagaMiddleware.run(rootSaga);