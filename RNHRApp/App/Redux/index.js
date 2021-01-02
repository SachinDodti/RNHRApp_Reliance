import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import appReducer from './Reducers';
import {composeWithDevTools} from 'redux-devtools-extension';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(appReducer, composeEnhancers(applyMiddleware(thunk)));

//const store = createStore(appReducer, applyMiddleware(thunk),composeWithDevTools());

export default store;
