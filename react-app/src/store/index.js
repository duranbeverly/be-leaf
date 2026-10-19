import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import session from './session'
import plants from './plants'
import reviews from './reviews'
import cart from './cart'
import images from './images'

const rootReducer = combineReducers({
  session,
  plants,
  reviews,
  cart,
  images
});


let enhancer;

if (import.meta.env.PROD) {
  enhancer = applyMiddleware(thunk);
} else {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
