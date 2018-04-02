import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadTrackers, toggleModal, incrementTracker } from '../../redux/actions';
import {
  AsyncStorage,
  Dimensions,
  View,
  Text,
  Button,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Icons from '../../assets/icons/index';
import ProgressBar from '../../components/progressBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const window = Dimensions.get('window');

class MainSwiperContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false
    }
  }
  async componentWillMount (props){
    // await AsyncStorage.removeItem('trackers');
    // await AsyncStorage.removeItem('lastTrackerId');
    await this.setState({loading: true})
    let openDate = new Date();
    let trackers = await AsyncStorage.getItem('trackers');
    let lastTrackerId = await AsyncStorage.getItem('lastTrackerId');
    trackers = trackers === null ? [] : JSON.parse(trackers);
    lastTrackerId = lastTrackerId === null ? 0 : JSON.parse(lastTrackerId);
    this.props.loadTrackers(trackers, lastTrackerId, openDate);

    this.setState({loading: false})
  }
  async saveTrackers() {
    console.log('Save called')
    await AsyncStorage.setItem('trackers', JSON.stringify(this.props.trackers));
    await AsyncStorage.setItem('lastTrackerId', JSON.stringify(this.props.lastTrackerId));
  }

  spreadTrackers() {
    let trackers = this.props.trackers.map((tracker, index, array) => (
        <View style={{flex: 1, flexDirection: 'column', backgroundColor:tracker.color}}>
          <View style={{flex: 0.15, justifyContent: 'center', alignItems:'center', flexDirection: 'row', margin: '5%'}}>
            <View style={{flex: 0.8}}>
              <Text style={{fontStyle: 'normal', fontSize: 40, fontWeight: '100'}}>
                {tracker.name}
              </Text>
            </View>
            <View style={{flex: 0.2}}>
              <TouchableHighlight 
                onPress={() => {
                  this.SwiperComponent.scrollBy(0, true)
                  console.log('SCROLLING BACK')
                }}
                style={{ height: '90%', borderRadius: 5, justifyContent: 'center', alignItems: 'center'}}
              >
                <Icon name='menu' size={40} color='white' />
              </TouchableHighlight>
            </View>
          </View>
          <View style={{flex: 0.35, justifyContent: 'center', alignItems: 'center'}}>
            {
              Icons.map((CurrentIcon, index) => {
                if(CurrentIcon.title === tracker.icon) {
                  return <CurrentIcon.icon height={200} width={200} />
                }
              })
            }
          </View> 
          <View style={{flex: 0.15}} >
          <ProgressBar
            progress={(tracker.progress / tracker.target)}
            style={{width: window.width}}
            backgroundStyle={{}}
            fillStyle={{ backgroundColor: 'white', height: window.height * 0.145, borderTopRightRadius: 12, borderBottomRightRadius: 12 }}
          />
          </View>
          <View style={{flex: 0.15}}>
            <Text style={{fontStyle: 'normal', fontSize: 30, fontWeight: '100'}}>PROGRESS: {tracker.progress} / {tracker.target} </Text>
            <Text style={{fontStyle: 'normal', fontSize: 30, fontWeight: '100'}}>{tracker.target - tracker.progress === 0 ? tracker.daily ? `ALL DONE FOR TODAY!`: 'ALL DONE!' : `${tracker.target - tracker.progress} TO GO!`}</Text>
          </View>
          <View style={{flex: 0.2, flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableHighlight 
              style={{flex: 1/3, justifyContent: 'center', alignItems: 'center'}}
              onPress={() => this.props.toggleModal(true, tracker)}>
                <Icon name='settings' size={70} />
            </TouchableHighlight>
            <TouchableHighlight 
              style={{flex: 1/3, justifyContent: 'center', alignItems: 'center'}} 
              onPress={() => {
                if (tracker.progress > 0 ){
                  this.props.incrementTracker(tracker.id, -tracker.quickAddSize);
                  this.saveTrackers();
                }
              }}
            >
                <Icon name='minus' size={70} />
            </TouchableHighlight>
            <TouchableHighlight 
              style={{flex: 1/3, justifyContent: 'center', alignItems: 'center'}}
              onPress={() => {
                if(tracker.progress < tracker.target) {
                  this.props.incrementTracker(tracker.id, tracker.quickAddSize);
                  this.saveTrackers();
                }
              }}
            >
                <Icon name='plus' size={70} />
            </TouchableHighlight>
          </View>
        </View>
    ))
    let trackersIndex = (
      <ScrollView contentContainerStyle={{flex: 1, height:'100%', flexDirection: 'column'}}>
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
        loop={false}
        showsPagination={false}
        scrollEnabled={true}
        ref={SwiperComponent => this.SwiperComponent = SwiperComponent}
      >
        {this.props.trackers.length > 0 ? this.spreadTrackers() : this.state.loading ? 
        (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
              <Text style={{fontStyle: 'normal', fontSize: 40, fontWeight: '100', textAlign:'center'}}>Loading...</Text>
            </View>
        ):
        (
          <TouchableHighlight 
          onPress={() => this.props.toggleModal(true)} 
          style={{flex: 1,backgroundColor: '#F6FBFB', justifyContent: 'center', alignItems: 'center'}}
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
    loadTrackers: (trackers, lastTrackerId) => dispatch(loadTrackers(trackers, lastTrackerId)),
    toggleModal: (trackerModalVisible, displayItem) => dispatch(toggleModal(trackerModalVisible, displayItem)),
    incrementTracker: (trackerId, incrementSize) => dispatch(incrementTracker(trackerId, incrementSize)),
  }
}

const mapStateToProps = state => ({
  currentTracker: state.currentTracker,
  trackers: state.trackers,
  lastTrackerId: state.lastTrackerId,
})

export default connect (mapStateToProps, bindActions)(MainSwiperContainer);