import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import paginate from './paginate'
import { combineReducers } from 'redux'

// Updates an entity cache in response to any action with response.entities.
const entities = (state = { users: {}, repos: {}, forks: {} }, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return error
  }

  return state
}

// Updates the pagination data for different actions.
const pagination = combineReducers({
  ForksReducer: paginate({
    mapActionToKey: action => action.fullName,
    types: [
      ActionTypes.FORKS_REQUEST,
      ActionTypes.FORKS_SUCCESS,
      ActionTypes.FORKS_FAILURE
    ]
  })
})

const rootReducer = combineReducers({
  entities,
  pagination,
  errorMessage,
})

export default rootReducer
