import {
  TOGGLE_MODAL,
  ADD_NEW_TRACKER,
  INCREMENT_TRACKER,
  UPDATE_TRACKER,
} from './types';

export const toggleModal = (trackerModalVisible, displayItem) => ({
  type: TOGGLE_MODAL,
  payload: {trackerModalVisible, displayItem},
});

export const addNewTracker = tracker => ({
  type: ADD_NEW_TRACKER,
  payload: tracker,
})

export const incrementTracker = (trackerId, incrementSize) => ({
  type: INCREMENT_TRACKER,
  payload: {trackerId, incrementSize},
})

export const updateTracker = updatedTracker => ({
  type: UPDATE_TRACKER,
  payload: updatedTracker,
})