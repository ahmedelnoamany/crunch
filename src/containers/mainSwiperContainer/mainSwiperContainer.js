import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../redux/actions';
import {
  View,
  Text,
  Button,
  ScrollView,
} from 'react-native';

class MainSwiperContainer extends Component {
  render() {
    return (
      <View>
        <Text>
          MainSwiperContainer
          {this.props.currentTracker.name}
          <Button
            title='toggle modal'
            onPress={() => this.props.toggleModal(true)}
          />
        </Text>
      </View>
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
})

export default connect (mapStateToProps, bindActions)(MainSwiperContainer);