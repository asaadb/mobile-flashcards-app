import { AsyncStorage } from 'react-native'
import { formatResults } from './helpers'

const DECKS_STORAGE_KEY = 'MobileFlashCards:Decks'

export function fetchDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then(formatResults)
}
export function submitDeck(deck) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck))
}
export function submitCard(card, id) {
  AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    data[id].questions.push(card)
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
  });
}
export function deleteDeck(entryId) {
  AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    delete data[entryId]
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
  });
}
