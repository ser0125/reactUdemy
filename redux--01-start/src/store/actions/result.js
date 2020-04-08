import * as actionTypes from './actionTypes';

export const saveResult = (res) => {
  return {
    type: actionTypes.STORE_RESULT,
    payload: res
  }
}

export const storeResult = (payload) => {
  return dispatch => {
    setTimeout( () => {
      dispatch(saveResult(payload));
    }, 2000);
  }
}

export const deleteResult = (payload) => {
  return {
    type: actionTypes.DELETE_RESULT,
    payload: payload
  }
}