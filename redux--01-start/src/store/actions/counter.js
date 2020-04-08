import * as actionTypes from './actionTypes';

export const increment = () => {
  return {
    type: actionTypes.INCREMENT
  }
}

export const decrement = () => {
  return {
    type: actionTypes.DECREMENT
  }
}

export const add10 = (payload) => {
  return {
    type: actionTypes.ADD_10,
    payload: payload
  }
}

export const sub15 = (payload) => {
  return {
    type: actionTypes.SUB_15,
    payload: payload
  }
}
