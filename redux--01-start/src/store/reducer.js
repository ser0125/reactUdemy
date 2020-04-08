import * as actionTypes from '../actions';

const initialState = {
  count: 0,
  results: []
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.INCREMENT:
      return {
        ...state,
        count: state.count + 1
      };
    case actionTypes.DECREMENT:
      return {
        ...state,
        count: state.count - 1
      };
    case actionTypes.ADD_10:
      return {
        ...state,
        count: state.count + action.payload
      };
    case actionTypes.SUB_15:
      return {
        ...state,
        count: state.count - action.payload
      };
      case actionTypes.STORE_RESULT:
        return {
          ...state,
          results: state.results.concat({id: new Date(), value: action.payload.count})
        };
      case actionTypes.DELETE_RESULT:
        const updatedArray = state.results.filter(result => {
          return result.id !== action.payload.resultId
        });
          return {
            ...state,
            results: updatedArray
          };
      default:
      return state;
  }
}

export default reducer;