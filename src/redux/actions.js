import {
  TOGGLE_MODAL
} from './types';

export const toggleModal = trackerModalVisible => ({
  type: TOGGLE_MODAL,
  payload: trackerModalVisible,
});

