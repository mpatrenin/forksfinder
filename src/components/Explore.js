import Container from 'react-bootstrap/Container';
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Explore extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setInputValue(this.props.value)
    }
  }

  getInputValue = () => {
    return this.input.value
  }

  setInputValue = (val) => {
    // Generally mutating DOM is a bad idea in React components,
    // but doing this for a single uncontrolled field is less fuss
    // than making it controlled and maintaining a state for it.
    this.input.value = val
  }

  handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.handleGoClick()
    }
  }

  handleGoClick = () => {
    this.props.onChange(this.getInputValue())
  }

  render() {
    return (
      <Container>
        <p>Type a owner/repo name and Go:</p>
        <input size="45"
               ref={(input) => this.input = input}
               defaultValue={this.props.value}
               onKeyUp={this.handleKeyUp} />
        <button onClick={this.handleGoClick}>
          Go!
        </button>

      </Container>
    )
  }
}
