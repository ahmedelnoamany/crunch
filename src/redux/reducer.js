
const initialState = {
  trackers: [
  ],
  currentTracker: {

  },
  trackerModalVisible: false,
  lastTrackerId: 10,
};

export default function (state = initialState, action) {
  if(!state) {
    this.state = initialState;
  }
  switch(action.type) {
    case 'TOGGLE_MODAL': {
      return {
        ...state,
        trackerModalVisible: action.payload,
      }
    }
    case 'ADD_NEW_TRACKER': {
      const currentTrackerArray = state.trackers.slice();
      let lastTrackerId = state.lastTrackerId + 1;
      let newTracker = action.payload;
      newTracker.id = lastTrackerId;
      currentTrackerArray.push(newTracker);
      return {
        ...state,
        trackers: currentTrackerArray,
        lastTrackerId
      }
    }
    case 'INCREMENT_TRACKER': {
      let currentTrackerArray = state.trackers.slice();
      console.log('currentTrackerArray: ', currentTrackerArray);
      let currentTrackerPosition = currentTrackerArray.findIndex(item => findById(item, action.payload.trackerId));
      console.log('currentTrackerPosition: ', currentTrackerPosition);
      let currentTracker = currentTrackerArray[currentTrackerPosition];
      console.log('currentTracker: ', currentTracker);
      currentTracker.progress += action.payload.incrementSize;
      console.log('currentTracker updated: ', currentTracker);
      currentTrackerArray.splice(currentTrackerPosition, 1, currentTracker);
      console.log('Final array: ', currentTrackerArray);
      return {
        ...state,
        trackers: currentTrackerArray,
      }
    }
    default:
      return state;
  }
}
function findById(item, trackerId) {
  return item.id === trackerId
}