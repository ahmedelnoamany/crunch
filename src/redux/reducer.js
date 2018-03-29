
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
      console.log('MODAL TOGGLED, REDUCER RECIEVED: ', action.payload)
      if(action.payload.displayItem === undefined) {
        return {
          ...state,
          currentTracker: {},
          trackerModalVisible: action.payload.trackerModalVisible,
        }
      } else {
        return {
          ...state,
          currentTracker: action.payload.displayItem,
          trackerModalVisible: action.payload.trackerModalVisible,
        }
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
      let trackerFound = findTracker(currentTrackerArray, action.payload.trackerId);
      trackerFound.currentTracker.progress += action.payload.incrementSize;
      currentTrackerArray.splice(trackerFound.currentTrackerPosition, 1, trackerFound.currentTracker);

      return {
        ...state,
        trackers: currentTrackerArray,
      }
    }
    default:
      return state;
  }
}
findTracker = (trackerArray, trackerId) => {
  let currentTrackerPosition = trackerArray.findIndex(item => findById(item, trackerId));
  let currentTracker = trackerArray[currentTrackerPosition];
  return {currentTracker, currentTrackerPosition};
}
function findById(item, trackerId) {
  return item.id === trackerId
}