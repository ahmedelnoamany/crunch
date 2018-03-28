
const initialState = {
  trackers: [
    // {name: 'Test Tracker 1', 
    // quickAddSize: 1,
    // progress: 3,
    // target: 10, 
    // daily: false, 
    // id: 1,
    // color: 'red'
    // },
    // {name: 'Test Tracker 2', 
    // quickAddSize: 1,
    // progress: 5,
    // target: 100, 
    // daily: false, 
    // id: 2,
    // color: 'orange'
    // },
    // {name: 'Test Tracker 3', 
    // quickAddSize: 1,
    // progress: 10,
    // target: 10, 
    // daily: false, 
    // id: 3,
    // color: 'yellow'
    // },
    // {name: 'Test Tracker 4', 
    // quickAddSize: 1,
    // progress:823, 
    // target: 1000, 
    // daily: false, 
    // id: 4,
    // color: 'green'
    // }
  ],
  currentTracker: {
    // name: 'Test Tracker', 
    // quickAddSize: 1, 
    // target: 10, 
    // daily: false, 
    // id: 1
  },
  trackerModalVisible: false,
  lastTrackerId: 0,
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
    default:
      return state;
  }
}