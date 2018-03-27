import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../redux/actions';
import {
  Modal,
  View,
  Text,
  Button,
  Dimensions,
} from 'react-native';

const window = Dimensions.get('window');

class TrackerModal extends Component {
  render() {
    return(
      <Modal
        visible={this.props.trackerModalVisible}
        animationType='slide'
        transparent
      >
        <View style={{flex: 1, backgroundColor: '#FCFCFC', marginTop: window.height * 0.3}}>
          <Text>Modal Open</Text>
          <Button
            title='close modal'
            onPress={() => this.props.toggleModal(false)}
          />
        </View>
      </Modal>
    )
  }
}

function bindActions(dispatch) {
  return {
    toggleModal: trackerModalVisible => dispatch(toggleModal(trackerModalVisible)),
  }
}

const mapStateToProps = state => ({
  trackerModalVisible: state.trackerModalVisible,
});

export default connect(mapStateToProps, bindActions)(TrackerModal);