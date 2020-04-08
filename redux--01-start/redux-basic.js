const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
  counter: 0
};

// Reducers
const rootReducer = (state = initialState, action) => {
  if(action.type === 'INC_COUNTER') {
    return {
      ...state,
      counter: state.counter + 1
    } 
  } else if(action.type === 'ADD_COUNTER') {
      return {
        ...state,
        counter: state.counter + action.payload
      }
  }
  return state
};

// Store
const store = createStore(rootReducer);
console.log(store.getState());


// Subscription 
store.subscribe(() => {
  console.log('Subscription', store.getState());
});

// Dispatching Actions
store.dispatch({ type: 'INC_COUNTER'});
store.dispatch({ type: 'ADD_COUNTER', payload: 10});
