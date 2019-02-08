import { AsyncStorage } from 'react-native'
import { formatResults } from './helpers'

const DECKS_STORAGE_KEY = 'MobileFlashCards:Decks'

export function fetchDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then(formatResults)
}
export function submitDeck(deck) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck))
    .then(results => {
      console.log('Results: ', results)
    })
}
export function clearAsyncStorage () {
   AsyncStorage.clear();
}


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
