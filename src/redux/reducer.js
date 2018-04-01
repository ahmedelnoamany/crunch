
const initialState = {
  trackers: [
  ],
  currentTracker: {

  },
  currentDateTime: new Date(),
  trackerModalVisible: false,
  lastTrackerId: 0,
};

export default function (state = initialState, action) {
  if(!state) {
    this.state = initialState;
  }
  switch(action.type) {
    case 'LOAD_TRACKERS': {
      let trackerArray = action.payload.trackers;
      let updatedTrackerArray = trackerArray.map((tracker, index) => {
        if(tracker.daily === true) {
          let trackerDate = tracker.date.substr(0, tracker.date.indexOf('T'));
          let currentDate = JSON.parse(JSON.stringify(state.currentDateTime));
          currentDate = currentDate.substr(0, currentDate.indexOf('T'));
          if(trackerDate !== currentDate) {
            tracker.progress = 0;
            tracker.date = state.currentDateTime;
          }
        }
      })
      return {
        ...state,
        trackers: action.payload.trackers,
        lastTrackerId: action.payload.lastTrackerId,
      }
    }
    case 'TOGGLE_MODAL': {
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
      if(newTracker.daily === true) {
        newTracker.date = new Date();
        console.log('Adding date, ', newTracker);
      }
      currentTrackerArray.push(newTracker);
      return {
        ...state,
        trackers: currentTrackerArray,
        lastTrackerId
      }
    }
    case 'UPDATE_TRACKER': {
      let currentTrackerArray = state.trackers.slice();
      let trackerFound = findTracker(currentTrackerArray, action.payload.trackerId);
      let newTracker = action.payload.updatedTracker;
      newTracker.id = action.payload.trackerId;
      if(newTracker.daily === true){
         if(!(trackerFound.currentTracker.date)) {
          newTracker.date = new Date();
         } else {
           newTracker.date = trackerFound.currentTracker.date;
         }
      }
      currentTrackerArray.splice(trackerFound.currentTrackerPosition, 1, newTracker);
      return {
        ...state,
        trackers: currentTrackerArray,
      }
    }
    case 'DELETE_TRACKER': {
      let currentTrackerArray = state.trackers.slice();
      let trackerFound = findTracker(currentTrackerArray, action.payload.trackerId);
      currentTrackerArray.splice(trackerFound.currentTrackerPosition, 1);
      return {
        ...state,
        trackers: currentTrackerArray,
      }
    }
    case 'INCREMENT_TRACKER': {
      let currentTrackerArray = state.trackers.slice();
      let trackerFound = findTracker(currentTrackerArray, action.payload.trackerId);
      trackerFound.currentTracker.progress += action.payload.incrementSize;
      trackerFound.currentTracker.progress > trackerFound.currentTracker.target ?
        trackerFound.currentTracker.progress = trackerFound.currentTracker.target :
        trackerFound.currentTracker.progress < 0 ? trackerFound.currentTracker.progress = 0 : '';
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