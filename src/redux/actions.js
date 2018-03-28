import {
  TOGGLE_MODAL,
  ADD_NEW_TRACKER,
} from './types';

export const toggleModal = trackerModalVisible => ({
  type: TOGGLE_MODAL,
  payload: trackerModalVisible,
});

export const addNewTracker = tracker => ({
  type: ADD_NEW_TRACKER,
  payload: tracker,
})
