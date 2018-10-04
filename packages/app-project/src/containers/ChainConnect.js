import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { interbitRedux } from 'interbit-ui-tools'
import { PRIVATE } from '../constants/chainAliases'
import { actionCreators } from '../interbit/my-projects'

const { chainDispatch, selectors } = interbitRedux

const mapStateToProps = (state, ownProps) => {
  const {
    location: { search }
  } = ownProps
  const query = queryString.parse(search)
  const { providerChainId, joinName, error } = query

  const isChainLoaded = selectors.isChainLoaded(state, {
    chainAlias: PRIVATE
  })

  return {
    isChainLoaded,
    providerChainId,
    joinName,
    error
  }
}

const mapDispatchToProps = dispatch => ({
  blockchainDispatch: action => dispatch(chainDispatch(PRIVATE, action))
})

export class ChainConnect extends Component {
  static propTypes = {
    isChainLoaded: PropTypes.bool,
    providerChainId: PropTypes.string,
    joinName: PropTypes.string,
    blockchainDispatch: PropTypes.func,
    error: PropTypes.string
  }

  static defaultProps = {
    isChainLoaded: false,
    providerChainId: null,
    joinName: null,
    blockchainDispatch: () => {},
    error: ''
  }

  doCompleteChainAuth = async () => {
    const { providerChainId, joinName, blockchainDispatch } = this.props

    // TODO: Dispatch rx action to indicate doing the join

    const mountProfileTokensAction = actionCreators.authorized({
      providerChainId,
      joinName
    })

    await blockchainDispatch(mountProfileTokensAction)

    // TODO: Dispatch rx action to indicate done the join
  }

  render() {
    const { isChainLoaded, providerChainId, joinName, error } = this.props

    if (!isChainLoaded) {
      return <div>Loading...</div>
    } else if (error) {
      return <div>User cancelled the app&rsquo;s authorization request</div>
    }

    return (
      <div>
        <h3>Complete the cAuth loop.</h3>
        <div>{`Join: ${joinName} to ${providerChainId}`}</div>
        <Button
          disabled={!isChainLoaded}
          onClick={this.doCompleteChainAuth}
          bsStyle="default"
          className="Secondary-button Open pull-right">
          Complete cAuth
        </Button>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChainConnect)
