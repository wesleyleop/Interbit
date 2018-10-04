import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Table } from 'react-bootstrap'
import { IconButton } from 'interbit-ui-components'

import modalNames from '../constants/modalNames'

export default class ConnectFormLoggedOut extends Component {
  static propTypes = {
    image: PropTypes.string,
    imageAlt: PropTypes.string,
    onCancel: PropTypes.func,
    requestedTokens: PropTypes.arrayOf(PropTypes.string),
    toggleModalFunction: PropTypes.func.isRequired,
    title: PropTypes.string
  }

  static defaultProps = {
    image: '',
    imageAlt: '',
    onCancel: undefined,
    requestedTokens: [],
    title: ''
  }

  render() {
    const {
      image,
      imageAlt,
      onCancel,
      requestedTokens,
      toggleModalFunction,
      title
    } = this.props

    return (
      <div>
        {image && <img src={image} alt={imageAlt} />}
        <h3>{title}</h3>
        <Table className="logged-out">
          <tbody>
            {requestedTokens.map(token => (
              <tr key={token}>
                <td>{token}</td>
                <td>Not signed in</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="btn-container">
          <IconButton
            text="Create Account"
            clickHandler={() => {
              toggleModalFunction(modalNames.SIGN_UP_MODAL_NAME)
            }}
          />
          <IconButton
            text="Go Back"
            className="secondary"
            clickHandler={() => onCancel()}
          />
        </div>
        <div className="text-btn-container">
          <Button
            className="text-button"
            onClick={() => {
              toggleModalFunction(modalNames.SIGN_IN_MODAL_NAME)
            }}>
            Have an Account? Sign-in
          </Button>
        </div>
      </div>
    )
  }
}
