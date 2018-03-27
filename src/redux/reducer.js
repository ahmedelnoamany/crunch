
const initialState = {
  trackers: [],
  currentTracker: {
    name: 'Test Tracker', 
    quickAddSize: 1, 
    target: 10, 
    daily: false, 
    id: 1
  },
  trackerModalVisible: false,
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
    default:
      return state;
  }
}