import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  results: []
};

const resultReducer = (state = initialState, action) => {
  switch(action.type){
      case actionTypes.STORE_RESULT:
        return updateObject( state, { results: state.results.concat({id: new Date(), value: action.payload.count })});
      case actionTypes.DELETE_RESULT:
        return deleteResult(state, action);
      default:
        return state;
  }
}

const deleteResult = (state, action) => {
  const updatedArray = state.results.filter(result => {
    return result.id !== action.payload.resultId
  });
  return  updateObject( state, { results: updatedArray });
}

export default resultReducer;