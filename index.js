import React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import configureStore from './src/configureStore';
import App from './src/App';

const store = configureStore();

const crunch = () => (
  <Provider store={store}>
    <App />
  </Provider>

);

AppRegistry.registerComponent('crunch', () => crunch);
