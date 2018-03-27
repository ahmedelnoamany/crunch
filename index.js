import React from 'react';
import { Provider } from 'react-redux';
import { 
  AppRegistry,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import configureStore from './src/configureStore';
import App from './src/App';

const store = configureStore();

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
});

const crunch = () => (
  <SafeAreaView style={styles.safeArea}>
    <Provider store={store}>
      <App />
    </Provider>
  </SafeAreaView>
);

AppRegistry.registerComponent('crunch', () => crunch);
