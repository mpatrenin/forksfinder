import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
// import DevTools from './DevTools'
import { Route } from 'react-router-dom'
import App from './App'
import RepoPage from './RepoPage'


const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <Route path="/" component={App} />
      <Route path="/:login/:forks"
             component={RepoPage} />

      {/* <DevTools /> */}
    </div>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root
