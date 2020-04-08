import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  count: 0,
};

const counterReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.INCREMENT:
      return updateObject( state, { count: state.count + 1 });
    case actionTypes.DECREMENT:
      return updateObject( state, { count: state.count - 1 });
    case actionTypes.ADD_10:
      return updateObject( state, { count: state.count + action.payload });
    case actionTypes.SUB_15:
      return updateObject( state, { count: state.count - action.payload });
    default:
      return state;
  }
}

export default counterReducer;