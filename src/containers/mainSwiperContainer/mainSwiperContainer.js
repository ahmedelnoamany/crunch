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
          <View style={{flex: 0.15, justifyContent: 'center', alignItems:'center', flexDirection: 'row', margin: '5%'}}>
            <View style={{flex: 0.8}}>
              <Text style={{fontStyle: 'normal', fontSize: 40, fontWeight: '100'}}>
                {tracker.name}
              </Text>
            </View>
            <View style={{flex: 0.2}}>
              <TouchableHighlight 
                onPress={() => this.SwiperComponent.scrollBy(-1*(index+1), true)}
                style={{ height: '90%', borderRadius: 5, justifyContent: 'center', alignItems: 'center'}}
              >
                <Icon name='menu' size={40} color='white' />
              </TouchableHighlight>
            </View>
          </View>
          <View style={{flex: 0.35, justifyContent: 'center', alignItems: 'center'}}>
            <RandomPlaceHolder height={200} width={200} />
          </View> 
          <View style={{flex: 0.15}} >
          <ProgressBar
            progress={(tracker.progress / tracker.target)}
            style={{width: window.width}}
            backgroundStyle={{}}
            fillStyle={{ backgroundColor: 'pink', height: window.height * 0.145, borderTopRightRadius: 12, borderBottomRightRadius: 12 }}
          />
          </View>
          <View style={{flex: 0.15}}>
            <Text style={{fontStyle: 'normal', fontSize: 30, fontWeight: '100'}}>PROGRESS: {tracker.progress} / {tracker.target} </Text>
            <Text style={{fontStyle: 'normal', fontSize: 30, fontWeight: '100'}}>{tracker.target - tracker.progress === 0 ? `ALL DONE!` : `${tracker.target - tracker.progress} TO GO!`}</Text>
          </View>
          <View style={{flex: 0.2, flexDirection: 'row', justifyContent: 'space-between'}}>
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
      <ScrollView contentContainerStyle={{flex: 1, flexDirection: 'column', backgroundColor: '#F1F7ED'}}>
        {
          this.props.trackers.map((tracker, index) => (
            <TouchableHighlight onPress={() => this.SwiperComponent.scrollBy(index + 1, true)}>
              <View style={{ height: 100, borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center'}}> 
                <Text style={{fontStyle: 'normal', fontSize: 40, fontWeight: '100'}}>{tracker.name}</Text>
              </View>
            </TouchableHighlight>
          ))
        }
        <TouchableHighlight onPress={() => this.props.toggleModal(true)}>
              <View style={{ height: 100, borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center'}}> 
                <Text style={{fontStyle: 'normal', fontSize: 40, fontWeight: '100'}}>+</Text>
              </View>
        </TouchableHighlight>
      </ScrollView>
    );
    trackers.unshift(trackersIndex);
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
        {this.props.trackers.length > 0 ? this.spreadTrackers() : (
          <TouchableHighlight 
          onPress={() => this.props.toggleModal(true)} 
          style={{flex: 1,backgroundColor: '#F1F7ED', justifyContent: 'center', alignItems: 'center'}}
          underlayColor='rgba(145,199,177,0.8)'
          >
            <View style={{flex: 0.4, justifyContent: 'center', alignItems: 'center'}}> 
              <Text style={{fontStyle: 'normal', fontSize: 40, fontWeight: '100', textAlign:'center'}}>Click Here To Add Your First Tracker!</Text>
            </View>
          </TouchableHighlight>
        )}
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