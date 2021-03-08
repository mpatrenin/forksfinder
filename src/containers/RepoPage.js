/* eslint-disable no-undef */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadForks } from '../actions'
import List from '../components/List'

const loadData = props => {
  const { forksInfo } = props
  props.loadForks(forksInfo)
}

class RepoPage extends Component {
  static propTypes = {
    repo: PropTypes.object,
    forksInfo: PropTypes.string.isRequired,
    forks: PropTypes.array,
    owner: PropTypes.object,
    Forkers: PropTypes.array.isRequired,
    ForksPagination: PropTypes.object,
    loadForks: PropTypes.func.isRequired,
  }

  componentDidMount() {
    loadData(this.props)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.forksInfo !== this.props.forksInfo) {
      loadData(this.props)
    }
  }

  handleLoadMoreClick = () => {
    this.props.loadForks(this.props.forksInfo, true)
  }

  render() {
    const { forks } = this.props

    if (!forks) {
      return <h1><i>Loading  details...</i></h1>
    }

    const { Forkers, ForksPagination } = this.props
    return (
      <>
        <List renderItem={this.renderUser}
              forks={forks} 
              items={Forkers}
              onLoadMoreClick={this.handleLoadMoreClick}
              loadingLabel={`Loading . ..`}
              {...ForksPagination} />
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // We need to lower case the login/name due to the way GitHub's API behaves.
  // Have a look at ../middleware/api.js for more details.
  const repo = ownProps.match.params.forks.toLowerCase()
  const login = ownProps.match.params.login.toLowerCase()


  const {
    pagination: { ForksReducer },
    entities: { users, repos, forks }
  } = state;

  const forksInfo = `${login}/${repo}`
  const ForksPagination = ForksReducer[forksInfo] || { ids: [] }
  const Forkers = ForksPagination.ids.map(id => forks[id])

  return {
    forksInfo,
    forks: Object.values(forks),
    Forkers,
    ForksPagination,
    repo: repos[forksInfo],
    owner: users[login],
    
  }
}

export default withRouter(connect(mapStateToProps, {
  loadForks})(RepoPage))
