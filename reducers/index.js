import { RECIEVE_DECKS, ADD_DECK, ADD_CARD } from "../actions";

export default function decks(state = {}, action) {
  switch (action.type) {
    case RECIEVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      };
    case ADD_CARD:
      const newState = { ...state };
      newState[action.id].questions.push(action.card);
      return newState;
    default:
      return state;
  }
}
