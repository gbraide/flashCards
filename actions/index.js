export const GET_ALL_DECKS = 'GET_ALL_DECKS'//RECEIVE_ENTRIES
export const ADD_DECK = 'ADD_DECK'//ADD_Entry
export const DELETE_DECK = 'DELETE_DECK'
export const ADD_CARD = 'ADD_CARD'

export function getAllDecks (decks) {//receiveEntries
  return {
    type: GET_ALL_DECKS,
    decks,
  }
}

export function addDeck (deck) {//addEntry
  return {
    type: ADD_DECK,
    deck,
  }
}

export function deleteDeck(id){
    return {
        type: DELETE_DECK,
        id,
    }
}

export function addCard({card, id}){
    return {
        type: ADD_CARD,
        id,
        card
    }
}