import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MainSwiperContainer from './containers/mainSwiperContainer/mainSwiperContainer';
import TrackerModal from './components/trackerModal';

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'red'}}>
          <MainSwiperContainer />
        </View>
        <TrackerModal />
      </View>
    );
  }
}
