/* eslint-disable no-undef */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadForks, loadPrevForks } from '../actions'
import List from '../components/List'

const loadData = props => {
  const { forksInfo, page } = props
  props.loadForks(forksInfo, page)
}

class RepoPage extends Component {
  static propTypes = {
    page: PropTypes.number,
    repo: PropTypes.object,
    forksInfo: PropTypes.string.isRequired,
    forks: PropTypes.array,
    owner: PropTypes.object,
    Forkers: PropTypes.array.isRequired,
    ForksPagination: PropTypes.object,
    currentResponse: PropTypes.object,
    loadForks: PropTypes.func.isRequired,
    loadPrevForks: PropTypes.func.isRequired,
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
    this.props.loadForks(this.props.forksInfo, null, true)
  }

  render() {
    const { forks, forksInfo, loadPrevForks } = this.props

    window.onpopstate = function(event) {
      loadPrevForks(forksInfo, event.state.page)
    }

    if (!forks) {
      return <h1><i>Loading  details...</i></h1>
    }

    const { Forkers, ForksPagination, currentResponse } = this.props
    return (
      <>
        <List renderItem={this.renderUser}
              forks={forks} 
              items={Forkers}
              onLoadMoreClick={this.handleLoadMoreClick}
              currentResults={currentResponse}
              loadingLabel={`Loading . ..`}
              {...ForksPagination } />
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const repo = ownProps.match.params.forks.toLowerCase()
  const login = ownProps.match.params.login.toLowerCase()

  let url = new URL(window.location.href)
  let search_params = url.searchParams
  let page = search_params.get('page') || 1

  const {
    pagination: { ForksReducer },
    entities: { users, repos, forks }
  } = state;

  const forksInfo = `${login}/${repo}`
  const currentResponseMass = ForksReducer[forksInfo] || { currentResponse:[] }
  const ForksPagination = ForksReducer[forksInfo] || { ids: [] }
  const Forkers = ForksPagination.ids.map(id => forks[id])
  const currentResponse = currentResponseMass.currentResponse

  return {
    forksInfo,
    forks: Object.values(forks),
    Forkers,
    ForksPagination,
    repo: repos[forksInfo],
    owner: users[login],
    page,
    currentResponse
  }
}

export default withRouter(connect(mapStateToProps, {
  loadForks,loadPrevForks})(RepoPage))
