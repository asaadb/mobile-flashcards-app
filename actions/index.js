export const RECIEVE_DICKS = 'RECIEVE_DICKS'
export const ADD_DICK = 'ADD_DICK'
export const ADD_CARD = 'ADD_CARD'

export function receiveDicks(dicks) {
  return {
    type: RECIEVE_DICKS,
    dicks,
  }
}
export function addDick(dick) {
  return {
    type: ADD_DICK,
    dick,
  }
}
export function addCard(card, id) {
  return {
    type: ADD_CARD,
    card,
  }
}
