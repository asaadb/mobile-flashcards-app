export const RECIEVE_DECKS = 'RECIEVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_CARD = 'ADD_CARD'

export function receiveDecks(decks) {
  return {
    type: RECIEVE_DECKS,
    decks,
  }
}
export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}
export function removeDeck(entryId) {
  return {
    type: REMOVE_DECK,
    entryId,
  }
}
export function addCard(card, id) {
  return {
    type: ADD_CARD,
    card,
    id,
  }
}
