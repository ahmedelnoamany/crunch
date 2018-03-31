import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import ReduxLogger from 'redux-logger';
import reducer from './redux/reducer';

export default function configureStore(initialState) {
  const enhancer = compose(applyMiddleware(ReduxLogger));
  const store = createStore(reducer, initialState, enhancer);
  
  return store;
}
