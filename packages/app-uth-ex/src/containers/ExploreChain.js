import React, { Component } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { BlockExplorer } from 'interbit-ui-components'
import { blockExplorerRedux } from 'interbit-ui-tools'

const DEFAULT_CHAIN_ALIAS = 'hub'
const {
  actionCreators: { selectBlock, showRawState },
  selectors: { getChainState, getSelectedBlockHash, getShowRawState }
} = blockExplorerRedux

const mapStateToProps = (state, ownProps) => {
  const {
    location: { search }
  } = ownProps

  const query = queryString.parse(search)
  const { alias: aliasFromUrl } = query

  const chainAlias = aliasFromUrl || DEFAULT_CHAIN_ALIAS

  return {
    selectedChain: getChainState(state, { chainAlias }),
    selectedBlockHash: getSelectedBlockHash(state),
    showRawData: getShowRawState(state)
  }
}

const mapDispatchToProps = dispatch => ({
  doShowRawData: showRaw => dispatch(showRawState(showRaw)),
  doSelectBlock: hash => dispatch(selectBlock(hash))
})

export class ExploreChain extends Component {
  static propTypes = {
    selectedChain: PropTypes.shape({
      chainAlias: PropTypes.string.isRequired,
      state: PropTypes.object.isRequired,
      interbit: PropTypes.object.isRequired,
      blocks: PropTypes.arrayOf(PropTypes.object).isRequired
    }).isRequired,
    showRawData: PropTypes.bool,
    doShowRawData: PropTypes.func.isRequired,
    selectedBlockHash: PropTypes.string,
    doSelectBlock: PropTypes.func.isRequired
  }

  static defaultProps = {
    showRawData: false,
    selectedBlockHash: null
  }

  render() {
    const {
      selectedChain,
      showRawData,
      doShowRawData,
      selectedBlockHash,
      doSelectBlock
    } = this.props

    return (
      <BlockExplorer
        selectedChain={selectedChain}
        showRawData={showRawData}
        doShowRawData={doShowRawData}
        selectedBlockHash={selectedBlockHash}
        doSelectBlock={doSelectBlock}
      />
    )
  }
}

export default reduxForm({
  form: 'ExploreChain',
  destroyOnUnmount: true
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ExploreChain)
)
