import * as actionType from './actions';

const initialState = {
  persons: []
};

const reducers = (state = initialState, action) => {
  switch(action.type){
    case actionType.ADD_PERSON:
      const newPerson = {
        id: Math.random(), // not really unique but good enough here!
        name: 'Max',
        age: Math.floor( Math.random() * 40 )
    }
      return {
        ...state,
        persons: state.persons.concat(newPerson)
      };
      case actionType.DELETE_PERSON:
      return {
        ...state,
        persons: state.persons.filter(person => {
          return person.id !== action.payload.personId
        })
      };
      default:
        return state;
  }
}

export default reducers;