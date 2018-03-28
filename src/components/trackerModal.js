import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../redux/actions';
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
    console.log('the value is: ', this.state.trackerTarget)
    return(
      <Modal
        visible={this.props.trackerModalVisible}
        animationType='slide'
        transparent
      >
        <KeyboardAvoidingView 
          contentContainerStyle={{
            flex: 1,
            backgroundColor: '#FCFCFC',
            marginTop: window.height * 0.3,
            shadowColor: 'black',
            shadowOpacity: 0.2,
            shadowRadius: 12
            }}
        >
         <View style={{
            flex: 0.1 , flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5,
          }}
          >
            <View>
              <Text>
                {this.props.currentTracker.name ? 'Settings: ' + this.props.currentTracker.name : 'Add a New Tracker'}
              </Text>
            </View>
            <View style={{ paddingRight: '2%' }}>
              <TouchableHighlight onPress={() => { this.cancelTrackerAdding()}} >
                <Icon name='close' size={30} color='#2B2D42' />
              </TouchableHighlight>
            </View>
          </View>
          <View style={{flex: 0.9, flexDirection: 'column'}}>
            <View style={{flex: 0.1, padding: '1%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              <Text>Name </Text>
              <TextInput
                style={{ height: '100%',width: '60%', borderColor: 'gray', borderWidth: 1, borderRadius: 8}}
                onChangeText={(text) => this.setState({trackerName: text})}
                placeholder='ex. Cups of Water'
              />
            </View>
            <View style={{flex: 0.2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
              <View style={{flex: 0.3,height: '80%', backgroundColor: 'red', borderRadius: 12, borderWidth: this.state.quickAdd1Selected ? 5 : 0}}>
                <TouchableHighlight 
                  onPress={() => this.setState({trackerQuickAddSize: 1})} 
                  onShowUnderlay={() => this.quickAddSizeSelected('+1')}
                >
                  <Text style={{height: '100%', width: '100%', textAlign: 'center', fontSize: 30}}> +1 </Text>
                </TouchableHighlight>
              </View>
              <View style={{flex: 0.3,height: '80%', backgroundColor: 'yellow', borderRadius: 12, borderWidth: this.state.quickAdd2Selected ? 5 : 0}}>
                <TouchableHighlight 
                  onPress={() => this.setState({trackerQuickAddSize: 10})}
                  onShowUnderlay={() => this.quickAddSizeSelected('+10')}
                >
                  <Text style={{height: '100%',width:'100%',textAlign: 'center', fontSize: 30}}> +10 </Text>
                </TouchableHighlight>
              </View>
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
                style={{flex: 0.3, fontSize: 30, textAlign: 'center', backgroundColor:'green', height: '80%', borderRadius: 12, borderWidth: this.state.quickAddBoxSelected ? 5 : 0}}
                ref={input => { this.quickAddSizeInput = input }}
                onFocus={() => {
                  this.quickAddSizeInput.clear()
                  this.quickAddSizeSelected('text')
                }}
              />
            </View>
            <View style={{flex: 0.3}}>
              <Text>Horizontal Scrollview with icons</Text>
            </View>
            <View style={{flex: 0.2, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                <View style={{flex: 0.8}}>
                  <TextInput
                    keyboardType='numeric'
                    placeholder='Target'
                    returnKeyType='done'
                    value={this.state.trackerTarget > 0 ? this.state.trackerTarget.toString() : ''}
                    onChange={e => this.setState({trackerTarget: Number(e.nativeEvent.text)})}
                    style={{ height: '60%',fontSize: 24, textAlign: 'center', backgroundColor:'green', borderRadius: 12}}
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
            <View style={{flex: 0.2, backgroundColor: 'grey', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
              <View style={{flex: 0.3, height:'100%', backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center'}}>
                <TouchableHighlight 
                  onPress={() => this.cancelTrackerAdding()}
                  style={{flex: 1, width: '100%', justifyContent: 'center'}}
                >
                  <Text style={{ textAlign: 'center', fontSize: 30}}> Cancel </Text>
                </TouchableHighlight>
              </View>
              <View style={{flex: 0.7, height: '100%', backgroundColor: 'green', alignItems: 'center' ,justifyContent: 'center'}}>
                  <TouchableHighlight 
                    onPress={() => this.saveTracker()}
                    style={{flex: 1, width: '100%', justifyContent: 'center'}}
                  >
                    <Text style={{textAlign: 'center', fontSize: 30}}> Create Tracker! </Text>
                  </TouchableHighlight>
              </View>
              </View>
          </View>
        </KeyboardAvoidingView>
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
  currentTracker: state.currentTracker,
});

export default connect(mapStateToProps, bindActions)(TrackerModal);