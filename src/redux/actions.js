import {
  LOAD_TRACKERS,
  TOGGLE_MODAL,
  ADD_NEW_TRACKER,
  INCREMENT_TRACKER,
  UPDATE_TRACKER,
  DELETE_TRACKER,
} from './types';

export const loadTrackers = (trackers, lastTrackerId) => ({
  type: LOAD_TRACKERS,
  payload: {trackers, lastTrackerId},
});

export const toggleModal = (trackerModalVisible, displayItem) => ({
  type: TOGGLE_MODAL,
  payload: {trackerModalVisible, displayItem},
});

export const addNewTracker = tracker => ({
  type: ADD_NEW_TRACKER,
  payload: tracker,
});

export const incrementTracker = (trackerId, incrementSize) => ({
  type: INCREMENT_TRACKER,
  payload: {trackerId, incrementSize},
});

export const updateTracker = (updatedTracker, trackerId) => ({
  type: UPDATE_TRACKER,
  payload: {updatedTracker, trackerId},
});

export const deleteTracker = trackerId => {
  console.log('Action recieved id: ', trackerId)
  return {type: DELETE_TRACKER,
  payload: trackerId,}
};