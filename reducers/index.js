import { RECIEVE_DICKS, ADD_DICK, ADD_CARD } from "../actions";

export default function dicks(state = {}, action) {
  switch (action.type) {
    case RECIEVE_DICKS:
      return {
        ...state,
        ...action.dicks
      };
    case ADD_DICK:
      return {
        ...state,
        ...action.dick
      };

    case ADD_CARD:
      const newState = { ...state };
      newState[action.id].questions.push(action.card);
      return newState;
    default:
      return state;
  }
}
