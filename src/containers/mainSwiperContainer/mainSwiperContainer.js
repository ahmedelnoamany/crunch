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
import RandomPlaceHolder from '../../assets/glassOfWater';

class MainSwiperContainer extends Component {
  spreadTrackers() {
    let trackers = this.props.trackers.map((tracker, index) => (
        <View style={{flex: 1, flexDirection: 'column', backgroundColor:tracker.color}}>
          <View style={{flex: 0.15, justifyContent: 'center', alignItems:'center', backgroundColor: 'grey', borderWidth: 1}}>
            <Text style={{fontStyle: 'normal', fontSize: 40, fontWeight: '100'}}>
              {tracker.name}
            </Text>
          </View>
          <View style={{flex: 0.35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'beige'}}>
            <RandomPlaceHolder height={200} width={200} />
          </View> 
          <View style={{flex: 0.15, borderWidth:1}}>

          </View>
          <View style={{flex: 0.2, borderBottomWidth: 1}}>

          </View>
          <View style={{flex: 0.15}}>

          </View>
        </View>
    ))
    let trackersIndex = (
      <ScrollView contentContainerStyle={{flex: 1, flexDirection: 'column'}}>
        {
          this.props.trackers.map((tracker, index) => (
            <TouchableHighlight onPress={() => this.SwiperComponent.scrollBy(index + 1, true)}>
              <View style={{ height: 100, borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center'}}> 
                <Text style={{fontStyle: 'normal', fontSize: 40, fontWeight: '100'}}>{tracker.name}</Text>
              </View>
            </TouchableHighlight>
          ))
        }
      </ScrollView>
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
        ref={SwiperComponent => this.SwiperComponent = SwiperComponent}
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