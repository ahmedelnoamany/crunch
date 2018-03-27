import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import reducer from './redux/reducer';

export default function configureStore(initialState) {
  const enhancer = compose(applyMiddleware());
  const store = createStore(reducer, initialState, enhancer);
  
  return store;
}
