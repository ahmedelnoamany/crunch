import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal, addNewTracker } from '../redux/actions';
import {
  Modal,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  TextInput,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
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
}
class TrackerModal extends Component {
  constructor(props){
    super(props);
    this.state= initialState;
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
  saveTracker() {
    let {trackerName, trackerQuickAddSize, trackerTarget, trackerDaily} = this.state;
    if(trackerName.length > 0 && trackerQuickAddSize > 0 && trackerTarget > 0) {
      let newTracker = {};
      newTracker.name = trackerName;
      newTracker.quickAddSize = trackerQuickAddSize;
      newTracker.progress = 0;
      newTracker.target = trackerTarget;
      newTracker.daily = trackerDaily;
      newTracker.color = randomColor();
      this.props.addNewTracker(newTracker);
      this.cancelTrackerAdding();
    } else {
      Alert.alert(
        'Error',
        'Please make sure all fields are inputed to add a new tracker!',
        [
          { text: 'Ok', onPress: () => {} },
        ],
      );
    }
      
  }
  cancelTrackerAdding() {
    this.setState(initialState);
    this.props.toggleModal(false);
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
            backgroundColor: '#C7C7A6',
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
              <Text style={{color:'#484538'}}>
                {this.props.currentTracker.name ? 'Settings: ' + this.props.currentTracker.name : 'Add a New Tracker'}
              </Text>
            </View>
            <View style={{ paddingRight: '2%' }}>
              <TouchableHighlight onPress={() => { this.cancelTrackerAdding()}} >
                <Icon name='close' size={30} color='#484538' />
              </TouchableHighlight>
            </View>
          </View>
          <View style={{flex: 0.9, flexDirection: 'column'}}>
            <View style={{flex: 0.1, padding: '1%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              <Text>Name </Text>
              <TextInput
                style={{ backgroundColor:'#FCFCFC', fontSize:24, fontWeight: '100', height: '100%',width: '60%', textAlign: 'center', borderColor: 'gray', borderWidth: 1, borderRadius: 8}}
                onChangeText={(text) => this.setState({trackerName: text})}
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
                    borderWidth: this.state.quickAdd1Selected ? 3 : 1,
                    backgroundColor: this.state.quickAdd1Selected ? '#6DD3CE' : '#C7C7A6'
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
                    borderWidth: this.state.quickAdd2Selected ? 3 : 1,
                    backgroundColor: this.state.quickAdd2Selected ? '#6DD3CE' : '#C7C7A6'
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
                  borderWidth: this.state.quickAddBoxSelected ? 3 : 1, 
                  backgroundColor: this.state.quickAddBoxSelected ? '#6DD3CE' : '#C7C7A6'
                }}
                ref={input => { this.quickAddSizeInput = input }}
                onFocus={() => {
                  this.quickAddSizeInput.clear()
                  this.quickAddSizeSelected('text')
                }}
              />
            </View>
            <View style={{flex: 0.3, backgroundColor: '#FCFCFC', borderTopWidth: 2, borderBottomWidth: 2}}>
              {/* <Text>Horizontal Scrollview with icons</Text> */}
            </View>
            <View style={{flex: 0.2, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                <View style={{flex: 0.8}}>
                  <TextInput
                    keyboardType='numeric'
                    placeholder='Target'
                    returnKeyType='done'
                    value={this.state.trackerTarget > 0 ? this.state.trackerTarget.toString() : ''}
                    onChange={e => this.setState({trackerTarget: Number(e.nativeEvent.text)})}
                    style={{ backgroundColor: '#FCFCFC',height: '60%',fontSize: 24, fontWeight: '100', textAlign: 'center', borderColor: 'gray', borderWidth: 1, borderRadius: 8}}
                    ref={input => {this.targetInput = input}}
                    onFocus={() => {
                      this.targetInput.clear()
                    }}
                  />
                </View>

                <CheckBox
                  label='Daily Target?'
                  checked={this.props.trackerDaily}
                  onChange={checked => this.setState({trackerDaily: checked})}
                />
            </View>
            <View style={{flex: 0.2, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderTopWidth: 2}}>
              <View style={{flex: 0.3, height:'100%', alignItems: 'center', justifyContent: 'center'}}>
                <TouchableHighlight 
                  onPress={() => this.cancelTrackerAdding()}
                  style={{flex: 1, width: '100%',alignItems:'center', justifyContent: 'center'}}
                >
                  <Icon name='cancel' size={50} color='#484538'/>
                </TouchableHighlight>
              </View>
              <View style={{flex: 0.7, height: '100%', alignItems: 'center' ,justifyContent: 'center', borderLeftWidth: 1}}>
                  <TouchableHighlight 
                    onPress={() => this.saveTracker()}
                    style={{flex: 1, width: '100%'}}
                  >
                    <View style={{flex: 1, justifyContent: 'center', flexDirection:'row', alignItems: 'center'}}>
                      <Icon name='create' size={50} color='#484538' />
                      <Text style={{textAlign: 'center', fontSize: 30, fontWeight:'100'}}> Create Tracker! </Text>
                    </View>
                  </TouchableHighlight>
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
    toggleModal: trackerModalVisible => dispatch(toggleModal(trackerModalVisible)),
    addNewTracker: tracker => dispatch(addNewTracker(tracker)),
  }
}

const mapStateToProps = state => ({
  trackerModalVisible: state.trackerModalVisible,
  currentTracker: state.currentTracker,
});

export default connect(mapStateToProps, bindActions)(TrackerModal);