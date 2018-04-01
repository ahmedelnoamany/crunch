import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal, addNewTracker, updateTracker, deleteTracker } from '../redux/actions';
import {
  AsyncStorage,
  Modal,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  TextInput,
  Keyboard,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from 'react-native-checkbox';
import randomColor from 'randomcolor';
const window = Dimensions.get('window');
const dismissKeyboard = require('dismissKeyboard');
const initialState = {
  trackerName: '',
  trackerQuickAddSize: 0,
  trackerTarget: 0,
  trackerDaily: false,
  quickAdd1Selected: false,
  quickAdd2Selected: false,
  quickAddBoxSelected: false,
  trackerColor: '',
  highlightedIndex: 0,
  mode: '',
}
class TrackerModal extends Component {
  constructor(props){
    super(props);
    this.state= initialState;
    this.colors = [];
    for(let i = 0; i< 15; i++){this.colors.push(randomColor())};
  }
  componentWillReceiveProps(props) {
    Object.keys(props.currentTracker).length > 0 ? this.setState({
      trackerName: props.currentTracker.name,
      trackerQuickAddSize: props.currentTracker.quickAddSize,
      trackerTarget: props.currentTracker.target,
      trackerDaily: props.currentTracker.daily,
      quickAdd1Selected: props.currentTracker.quickAddSize === 1 ? true: false,
      quickAdd2Selected: props.currentTracker.quickAddSize === 10 ? true: false,
      quickAddBoxSelected: props.currentTracker.quickAddSize > 0 && props.currentTracker.quickAddSize !== 1 && props.currentTracker.quickAddSize !== 10 ? true: false,
      mode: 'settings',
    }) :
    {};
  }
  quickAddSizeSelected(name) {
    name !== 'text' ? dismissKeyboard() : '';
    name === '+1' ?
      this.setState({quickAdd1Selected: true, quickAdd2Selected: false, quickAddBoxSelected: false}) :
    name === '+10' ?
      this.setState({quickAdd1Selected: false, quickAdd2Selected: true, quickAddBoxSelected: false}) :
    name === 'text' ?
      this.setState({quickAdd1Selected: false, quickAdd2Selected: false, quickAddBoxSelected: true}) :
      this.setState({quickAdd1Selected: false, quickAdd2Selected: false, quickAddBoxSelected: false})
  }
  saveTracker(type) {
    let {trackerName, trackerQuickAddSize, trackerTarget, trackerDaily} = this.state;
    if(trackerName.length > 0 && trackerQuickAddSize > 0 && trackerTarget > 0) {
      let newTracker = {};
      newTracker.name = trackerName;
      newTracker.quickAddSize = trackerQuickAddSize;
      newTracker.progress = 0;
      newTracker.target = trackerTarget;
      newTracker.daily = trackerDaily;
      newTracker.color = type === 'modify' ? this.props.currentTracker.color : randomColor();
      type === 'modify' ? (this.props.currentTracker.progress <= trackerTarget ? 
      newTracker.progress = this.props.currentTracker.progress : 
      newTracker.progress = trackerTarget ) :
      '';
      // type === 'modify' ? newTracker.id = this.props.currentTracker.id : '';
      type === 'save' ? this.props.addNewTracker(newTracker) : this.props.updateTracker(newTracker, this.props.currentTracker.id);
      this.cancelTrackerAdding();
      
    } else {
      Alert.alert(
        'Error',
        'Please make sure all fields are inputed correctly!',
        [
          { text: 'Ok', onPress: () => {} },
        ],
      );
    }
      
  }
  async saveTrackers() {
    console.log('Save called')
    await AsyncStorage.setItem('trackers', JSON.stringify(this.props.trackers));
    await AsyncStorage.setItem('lastTrackerId', JSON.stringify(this.props.lastTrackerId));
  }
  cancelTrackerAdding() {
    this.setState(initialState);
    setTimeout(() => this.props.toggleModal(false), 10);
  }
  render() {
    return(
      <Modal
        visible={this.props.trackerModalVisible}
        animationType='slide'
        transparent
      >
        <View 
          style={{
            flex: 1,
            backgroundColor: '#D2EAED',
            marginTop: window.height * 0.3,
            shadowColor: 'black',
            shadowOpacity: 0.2,
            shadowRadius: 12
            }}
        >
         <View style={{
            flex: 0.1 , flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5
          }}
          >
            <View>
              <Text style={{color:'#3A506B'}}>
                {Object.keys(this.props.currentTracker).length > 0 ? 'Settings: ' + this.props.currentTracker.name : 'Add a New Tracker'}
              </Text>
            </View>
            <View style={{ paddingRight: '2%' }}>
              <TouchableHighlight onPress={() => { this.cancelTrackerAdding()}} >
                <Icon name='close' size={30} color='#3A506B' />
              </TouchableHighlight>
            </View>
          </View>
          <View style={{flex: 0.9, flexDirection: 'column'}}>
            <View style={{flex: 0.1, padding: '1%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              <Text>Name </Text>
              <TextInput
                style={{ backgroundColor:'#FCFCFC', fontSize:24, fontWeight: '100', height: '100%',width: '60%', textAlign: 'center', borderColor: '#BFD5D8', borderWidth: 1, borderRadius: 8}}
                onChangeText={(text) => this.setState({trackerName: text})}
                value={this.state.trackerName}
                placeholder='ex. Cups of Water'
              />
            </View>
            <View style={{flex: 0.2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                <TouchableHighlight 
                  onPress={() => this.setState({trackerQuickAddSize: 1})} 
                  onShowUnderlay={() => this.quickAddSizeSelected('+1')}
                  style={{
                    flex: 0.3,
                    height: '80%',
                    justifyContent:'center',
                    alignItems:'center',
                    borderRadius: 12,
                    borderColor: '#BFD5D8',
                    borderWidth: this.state.quickAdd1Selected ? 3 : 1,
                    backgroundColor: this.state.quickAdd1Selected ? '#89BBFE' : 'white'
                  }}
                >
                  <Text style={{fontSize: 30, fontWeight: '100'}}> +1 </Text>
                </TouchableHighlight>
                <TouchableHighlight 
                  onPress={() => this.setState({trackerQuickAddSize: 10})}
                  onShowUnderlay={() => this.quickAddSizeSelected('+10')}
                  style={{
                    flex: 0.3,
                    height: '80%', 
                    justifyContent:'center',
                    alignItems:'center', 
                    borderRadius: 12,
                    borderColor: '#BFD5D8',
                    borderWidth: this.state.quickAdd2Selected ? 3 : 1,
                    backgroundColor: this.state.quickAdd2Selected ? '#89BBFE' : 'white'
                  }}
                >
                  <Text style={{fontSize: 30, fontWeight: '100'}}> +10 </Text>
                </TouchableHighlight>
              <TextInput
                keyboardType='numeric'
                returnKeyType="done"
                value={this.state.quickAddBoxSelected && 
                  this.state.trackerQuickAddSize !== 0 &&
                  this.state.trackerQuickAddSize !== 1 &&
                  this.state.trackerQuickAddSize !== 10 ? 
                    `+${this.state.trackerQuickAddSize}` : '+' 
                  }
                onChange={e => this.setState({trackerQuickAddSize: Number(e.nativeEvent.text) > 0 ? Number(e.nativeEvent.text) : 1 })}
                style={{
                  flex: 0.3, 
                  fontSize: 30, 
                  fontWeight: '100', 
                  textAlign: 'center', 
                  height: '80%', 
                  borderRadius: 12,
                  borderColor: '#BFD5D8',
                  borderWidth: this.state.quickAddBoxSelected ? 3 : 1, 
                  backgroundColor: this.state.quickAddBoxSelected ? '#89BBFE' : 'white',
                  color: this.state.quickAddBoxSelected ? 'white' : 'black'
                }}
                ref={input => { this.quickAddSizeInput = input }}
                onFocus={() => {
                  this.quickAddSizeInput.clear()
                  this.quickAddSizeSelected('text')
                }}
              />
            </View>
            <View style={{flex: 0.3, backgroundColor: '#FCFCFC', borderTopWidth: 2, borderBottomWidth: 2, borderColor: '#BFD5D8', flexDirection:'column'}}>
                <View style={{flex: 0.5}}>
                  <FlatList 
                    style={{flex: 1}} 
                    contentContainerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    data={this.colors}
                    horizontal={true}
                    renderItem={(Item) => {
                    return (
                    <TouchableHighlight onPress={() => this.setState({trackerColor: Item.item, highlightedIndex: Item.index})}>
                    <View style={{backgroundColor: Item.item, borderWidth: this.state.highlightedIndex === Item.index ? 5 : 0, marginTop:10, width: 100, height: 150, justifyContent: 'center', alignItems:'center'}}>
                      <Text>
                        {this.state.highlightedIndex === Item.index ? `Selected!` : ``}
                      </Text>
                    </View>
                    </TouchableHighlight>)}}
                  />
                </View>
            </View>
            <View style={{flex: 0.2, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                <View style={{flex: 0.8}}>
                  <TextInput
                    keyboardType='numeric'
                    placeholder='Target'
                    returnKeyType='done'
                    value={this.state.trackerTarget > 0 ? this.state.trackerTarget.toString() : ''}
                    onChange={e => this.setState({trackerTarget: Number(e.nativeEvent.text)})}
                    style={{ backgroundColor: '#FCFCFC',height: '60%',fontSize: 24, fontWeight: '100', textAlign: 'center', borderColor: '#BFD5D8', borderWidth: 1, borderRadius: 8}}
                    ref={input => {this.targetInput = input}}
                    onFocus={() => {
                      this.targetInput.clear()
                    }}
                  />
                </View>

                <CheckBox
                  label='Daily Target?'
                  checked={this.state.trackerDaily}
                  onChange={checked => this.setState({trackerDaily: !checked})}
                  borderColor='#BFD5D8'
                />
            </View>
            <View style={{flex: 0.2, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderColor: '#BFD5D8'}}>
              <View style={{flex: 0.3, height:'100%', alignItems: 'center', justifyContent: 'center'}}>
                <TouchableHighlight 
                  onPress={() => this.cancelTrackerAdding()}
                  style={{flex: 1, width: '100%',alignItems:'center', justifyContent: 'center' ,backgroundColor:'#D5D5D5'}}
                >
                  <Icon name='cancel' size={50} color='#6F7F93'/>
                </TouchableHighlight>
              </View>
              <View style={{flex: 0.7, height: '100%', alignItems: 'center' ,justifyContent: 'center', borderLeftWidth: 1, borderColor: '#BFD5D8'}}>
                {this.state.mode !== 'settings' && (
                  <TouchableHighlight 
                    onPress={async () => {
                      await this.saveTracker('save');
                      await this.saveTrackers();
                      }
                    }
                    style={{flex: 1, width: '100%', backgroundColor: '#76DE8C'}}
                  >
                    <View style={{flex: 1, justifyContent: 'center', flexDirection:'row', alignItems: 'center'}}>
                      <Icon name='create' size={50} color='#6F7F93' />
                      <Text style={{textAlign: 'center', fontSize: 30, fontWeight:'100', color: '#5B6879'}}> Create Tracker! </Text>
                    </View>                    
                  </TouchableHighlight>
                )}
                {this.state.mode === 'settings' && (
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <TouchableHighlight
                      onPress={ () => {
                        Alert.alert(
                          'Warning',
                          'Deleting a tracker cannot be undone, continue?',
                          [
                            {text: 'Cancel', onPress: () => {}},
                            {text: 'Continue', onPress: async () => {
                              await this.props.deleteTracker(this.props.currentTracker.id);
                              this.saveTrackers();
                              this.cancelTrackerAdding();
                            }}
                          ]
                        );
                      }}
                      style={{flex: 0.4, height: '100%', backgroundColor: '#DD1C1A'}}
                    >
                    <View style={{flex: 1, justifyContent: 'center', flexDirection:'row', alignItems: 'center'}}>
                        <Icon name='delete' size={50} color='#6F7F93' />
                      </View>  
                    </TouchableHighlight>

                    <TouchableHighlight 
                      onPress={async () => {
                          await this.saveTracker('modify');
                          await this.saveTrackers();
                        }
                      }
                      style={{flex: 0.6, borderLeftWidth: 1, borderColor: '#BFD5D8', backgroundColor: '#76DE8C'}}
                    >
                      <View style={{flex: 1, justifyContent: 'center', flexDirection:'row', alignItems: 'center'}}>
                        <Icon name='file-upload' size={50} color='#6F7F93' />
                        <Text style={{textAlign: 'center', fontSize: 20, fontWeight:'200', color: '#5B6879'}}> Update! </Text>
                      </View>                   
                    </TouchableHighlight>
                  </View>
                  )}
              </View>
              </View>
          </View>
        </View>
      </Modal>
    )
  }
}

function bindActions(dispatch) {
  return {
    toggleModal: (trackerModalVisible, displayItem) => dispatch(toggleModal(trackerModalVisible, displayItem)),
    addNewTracker: tracker => dispatch(addNewTracker(tracker)),
    updateTracker: (updatedTracker, trackerId) => dispatch(updateTracker(updatedTracker, trackerId)),
    deleteTracker: trackerId => dispatch(deleteTracker(trackerId)),
  }
}

const mapStateToProps = state => ({
  trackerModalVisible: state.trackerModalVisible,
  currentTracker: state.currentTracker,
  lastTrackerId: state.lastTrackerId,
  trackers : state.trackers,
});

export default connect(mapStateToProps, bindActions)(TrackerModal);