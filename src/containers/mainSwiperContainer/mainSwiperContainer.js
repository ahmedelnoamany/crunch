import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../redux/actions';
import {
  View,
  Text,
  Button,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import Swiper from 'react-native-swiper';

class MainSwiperContainer extends Component {
  spreadTrackers() {
    let trackers = this.props.trackers.map((tracker, index) => (
        <View style={{flex: 1, backgroundColor:tracker.color}}>
          <Text>
            {tracker.name}
          </Text>
        </View>
    ))
    let trackersIndex = (
      <View style={{flex: 1}}>
        <Text>
          Index
        </Text>
      </View>
    );
    trackers.unshift(trackersIndex);
    console.log(trackers);
    return trackers;
  }
  render() {
    return (
      <Swiper
        index={0}
        loop={true}
        showsPagination={false}
        scrollEnabled={true}
      >
        {this.props.trackers.length > 0 ? this.spreadTrackers() : ''}
      </Swiper>
    );
  }
}

function bindActions(dispatch) {
  return {
    toggleModal: trackerModalVisible => dispatch(toggleModal(trackerModalVisible)),
  }
}

const mapStateToProps = state => ({
  currentTracker: state.currentTracker,
  trackers: state.trackers,
})

export default connect (mapStateToProps, bindActions)(MainSwiperContainer);