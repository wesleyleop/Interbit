import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from 'react-bootstrap'
import { IconButton, Markdown, ModalWrapper } from 'interbit-ui-components'

import OAuthButton from '../components/OAuthButton'
import buttonNames from '../constants/buttonNames'
import modalNames from '../constants/modalNames'
import oAuthProviders from '../constants/oAuthProviders'

export default class ModalAttention extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    checkbox: PropTypes.string.isRequired,
    moreInfo: PropTypes.string.isRequired,
    toggleButton: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
    isEnabled: PropTypes.bool,
    show: PropTypes.bool,
    oAuth: PropTypes.shape({})
  }

  static defaultProps = {
    oAuth: {},
    isEnabled: false,
    show: false
  }

  render() {
    const {
      oAuth,
      title,
      content,
      checkbox,
      moreInfo,
      toggleButton,
      toggleModal,
      isEnabled,
      show
    } = this.props

    const header = <h2>{title}</h2>
    const body = <Markdown markdown={content} />
    const footer = (
      <div>
        <Checkbox
          name="check"
          onClick={e => {
            toggleButton(buttonNames.DISCLAIMER_BUTTON_NAME, e.target.checked)
          }}>
          {checkbox}
        </Checkbox>
        <Markdown markdown={moreInfo} />

        <OAuthButton
          text="Continue"
          name="continue"
          oAuth={{ ...oAuth, oAuthProvider: oAuthProviders.GITHUB }}
          className={isEnabled ? '' : 'disabled'}
        />
        <IconButton
          text="Cancel"
          name="cancel"
          className="secondary"
          clickHandler={() => toggleModal(modalNames.ATTENTION_MODAL_NAME)}
        />
      </div>
    )

    return (
      <ModalWrapper
        header={header}
        body={body}
        footer={footer}
        show={show}
        className="modal-attention"
      />
    )
  }
}
