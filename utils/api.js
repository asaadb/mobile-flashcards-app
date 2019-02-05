import { AsyncStorage } from 'react-native'
import { formatResults } from './helpers'

const DECKS_STORAGE_KEY = 'MobileFlashCards:Decks'

export function fetchDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then(formatResults)
}
// export function saveDeck({deck, id}) {
//   return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
//       [id]: deck
//     }))
//     .then(results => {
//       console.log('Results: ', results)
//     })
// }

// export function removeDeck() {
//   return AsyncStorage.getItem(DECKS_STORAGE_KEY)
//     .then(results => {
//       console.log('Results: ', results)
//     })
// }
// export function saveCard() {
//   return AsyncStorage.getItem(DECKS_STORAGE_KEY)
//     .then(results => {
//       console.log('Results: ', results)
//     })
// }
// export function removeCard() {
//   return AsyncStorage.getItem(DECKS_STORAGE_KEY)
//     .then(results => {
//       console.log('Results: ', results)
//     })
// }
