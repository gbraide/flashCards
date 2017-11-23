
import {GET_ALL_DECKS, ADD_DECK, DELETE_DECK, ADD_CARD} from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case GET_ALL_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK :
      return {
        ...state,
        ...action.deck
      }
    case DELETE_DECK :
      let new_delete_state = state
      delete new_delete_state[action.id]
      return new_delete_state

    case ADD_CARD :
      let new_state = state
      new_state[action.id].questions.push(action.card)
      return new_state
      
    default :
      return state
  }
}

export default decks