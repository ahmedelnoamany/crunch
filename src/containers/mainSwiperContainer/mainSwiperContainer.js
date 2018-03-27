import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../redux/actions';
import {
  Dimensions,
  View,
  Text,
  Button,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import Swiper from 'react-native-swiper';
import RandomPlaceHolder from '../../assets/glassOfWater';
import ProgressBar from '../../components/progressBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const window = Dimensions.get('window');

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
          <View style={{flex: 0.15, borderWidth:1, backgroundColor:'white'}} >
          <ProgressBar
            progress={(tracker.progress / tracker.target)}
            style={{width: window.width}}
            backgroundStyle={{ backgroundColor: 'red' }}
            fillStyle={{ backgroundColor: 'pink', height: window.height * 0.145 }}
          />
          </View>
          <View style={{flex: 0.2, borderBottomWidth: 1}}>
            <Text style={{fontStyle: 'normal', fontSize: 30, fontWeight: '100'}}>PROGRESS: {tracker.progress} / {tracker.target} </Text>
            <Text style={{fontStyle: 'normal', fontSize: 30, fontWeight: '100'}}>{tracker.target - tracker.progress === 0 ? `ALL DONE!` : `${tracker.target - tracker.progress} TO GO!`}</Text>
          </View>
          <View style={{flex: 0.15, flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableHighlight style={{flex: 1/3, justifyContent: 'center', alignItems: 'center'}} onPress={() => console.log('press')}>
                <Icon name='settings' size={70} />
            </TouchableHighlight>
            <TouchableHighlight style={{flex: 1/3, justifyContent: 'center', alignItems: 'center'}} onPress={() => console.log('press')}>
                <Icon name='minus' size={70} />
            </TouchableHighlight>
            <TouchableHighlight style={{flex: 1/3, justifyContent: 'center', alignItems: 'center'}} onPress={() => console.log('press')}>
                <Icon name='plus' size={70} />
            </TouchableHighlight>
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
    console.log('here', trackers);
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