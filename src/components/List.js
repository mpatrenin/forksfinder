import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class List extends Component {
  static propTypes = {
    loadingLabel: PropTypes.string.isRequired,
    pageCount: PropTypes.number,
    forks: PropTypes.array,
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onLoadMoreClick: PropTypes.func.isRequired,
    nextPageUrl: PropTypes.string
  }

  static defaultProps = {
    isFetching: true,
    loadingLabel: 'Loading...'
  }

  renderLoadMore() {
    const { isFetching, onLoadMoreClick } = this.props
    return (
      <button style={{ fontSize: '150%' }}
              onClick={onLoadMoreClick}
              disabled={isFetching}>
        {isFetching ? 'Loading...' : 'Next page'}
      </button>
    )
  }     


  render() {

    const {
      isFetching, nextPageUrl, pageCount,
      items, forks, loadingLabel
    } = this.props
    const size = 30;

    const forkslist = Object.values(forks)

    const isEmpty = items.length === 0
    if (isEmpty && isFetching) {
      return <h2><i>{loadingLabel}</i></h2>
    }

    const isLastPage = !nextPageUrl
    if (isEmpty && isLastPage) {
      return <h1><i>Nothing here!</i></h1>
    }

    return (
      <div>
        <table >
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Owner</th>
              <th>stargazers_count</th>
              <th>Links</th>
            </tr>
          </thead>
          <tbody>
              {forkslist.slice(0, size).map((fork)=>{
                    return <tr key={fork.fullName}>
                        <th>{forkslist.indexOf(fork)+1}</th>
                        <th>{fork.fullName}</th>
                        <th>{fork.owner.login}</th>
                        <th>{fork.stargazersCount}</th>
                        <th><a href={fork.htmlUrl}>{fork.htmlUrl}</a></th>
                        </tr>
                })
                }
          </tbody>
        </table>
        {pageCount > 0 && !isLastPage && this.renderLoadMore()}
      </div>
    )
  }
}
