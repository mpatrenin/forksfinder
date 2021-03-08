import { CALL_API, Schemas } from '../middleware/api'

export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.

const fetchUser = login => ({
  [CALL_API]: {
    types: [ USER_REQUEST, USER_SUCCESS, USER_FAILURE ],
    endpoint: `users/${login}`,
    schema: Schemas.USER
  }
})

export const loadUser = (login, requiredFields = []) => (dispatch, getState) => {
  const user = getState().entities.users[login]
  if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
    return null
  }

  return dispatch(fetchUser(login))
}

export const REPO_REQUEST = 'REPO_REQUEST'
export const REPO_SUCCESS = 'REPO_SUCCESS'
export const REPO_FAILURE = 'REPO_FAILURE'

// Fetches a forks from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.

const fetchForks = (fullName, nextPageURL) => ({
  fullName,
  [CALL_API]: {
    types: [ FORKS_REQUEST, FORKS_SUCCESS, FORKS_FAILURE ],
    endpoint: nextPageURL,
    schema: Schemas.FORKS_ARRAY
  }
})

export const loadForks = (fullName, page, nextPage) => (dispatch, getState) => {
    let {
      nextPageUrl = `repos/${fullName}/forks?page=${page}`,
      pageCount = 0
    } = getState().pagination.ForksReducer[fullName] || {}

    if (pageCount > 0 && !nextPage) {
      console.log('returning null')
      return null
    }

    let url = new URL(window.location.href)
    let search_params = url.searchParams

    if (!window.location.href.includes('page')){
      search_params.set('page', '1')
      window.history.replaceState({}, 'page', `?page=1`)
    } 

    return dispatch(fetchForks(fullName, nextPageUrl))
}

  export const loadPrevForks = (fullName, page) => (dispatch, getState) => {
    let nextPageUrl = `repos/${fullName}/forks?page=${page}`
    return dispatch(fetchForks(fullName, nextPageUrl))
  }

  export const FORKS_REQUEST = 'FORKS_REQUEST'
  export const FORKS_SUCCESS = 'FORKS_SUCCESS'
  export const FORKS_FAILURE = 'FORKS_FAILURE'

// Fetches a single repository from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchRepo = fullName => ({
  [CALL_API]: {
    types: [ REPO_REQUEST, REPO_SUCCESS, REPO_FAILURE ],
    endpoint: `repos/${fullName}`,
    schema: Schemas.REPO
  }
})

// Fetches a single repository from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export const loadRepo = (fullName, requiredFields = []) => (dispatch, getState) => {
  const repo = getState().entities.repos[fullName]
  if (repo && requiredFields.every(key => repo.hasOwnProperty(key))) {
    return null
  }

  return dispatch(fetchRepo(fullName))
}


export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
})
