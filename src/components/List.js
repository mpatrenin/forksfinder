import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default class List extends Component {
  static propTypes = {
    loadingLabel: PropTypes.string.isRequired,
    pageCount: PropTypes.number,
    forks: PropTypes.array,
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onLoadMoreClick: PropTypes.func.isRequired,
    nextPageUrl: PropTypes.string,
    currentResults: PropTypes.object
  }

  static defaultProps = {
    isFetching: true,
    loadingLabel: 'Loading...'
  }

  handleclick(){
    window.history.back();
  }

  renderLoadMore() {
    const { isFetching, onLoadMoreClick } = this.props

    return (
      <>
      <Button style={{ fontSize: '150%' }}
              onClick={()=>{this.handleclick()}}
              disabled={isFetching}>
        {isFetching ? 'Loading...' : 'Prev page'}
      </Button>
      <Button className='ml-2' style={{ fontSize: '150%' }}
              onClick={onLoadMoreClick}
              disabled={isFetching}>
        {isFetching ? 'Loading...' : 'Next page'}
      </Button>
      </>
    )
  }

  render() {

    const { isFetching, nextPageUrl, pageCount, loadingLabel, currentResults} = this.props

    const isEmpty = currentResults.length === 0
    if (isEmpty && isFetching) {
      return <h2><i>{loadingLabel}</i></h2>
    }

    const isLastPage = !nextPageUrl
    if (isEmpty && isLastPage) {
      return <h1><i>Nothing here!</i></h1>
    }

    return (

      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>IDs</th>
              <th>Full Name</th>
              <th>Owner</th>
              <th>stargazers_count</th>
              <th>Links</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(currentResults).map((fork)=>{
              return <tr key={fork.fullName}>
                      <th>{fork.id}</th>
                      <th>{fork.fullName}</th>
                      <th>{fork.owner}</th>
                      <th>{fork.stargazersCount}</th>
                      <th><a href={fork.htmlUrl}>{fork.htmlUrl}</a></th>
                    </tr>
            })}
          </tbody>
        </Table>
        {pageCount > 0 && !isLastPage && this.renderLoadMore()}
      </Container>
    )
  }
}
