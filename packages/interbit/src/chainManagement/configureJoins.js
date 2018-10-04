const {
  coreCovenant: {
    actionCreators: {
      startConsumeState,
      startProvideState,
      authorizeReceiveActions,
      authorizeSendActions
    }
  },
  manifest: {
    selectors: { getChainIdByAlias }
  },
  constants: { JOIN_TYPES }
} = require('interbit-covenant-tools')
const log = require('../log')

/**
 * Configures joins on the chain whose interface is passed as `chainInterface`,
 * based on the `joins` parameter. Uses the manifest for chain ID resolution
 * in the joins.
 * @param {Object} chainInterface - Interface to the chain to be configured.
 * @param {Object} joins - Join configuration for the chain.
 * @param {Object} interbitManifest - Manifest containing chain ID to alias resolutions.
 */
const configureJoins = (chainInterface, joins, interbitManifest) => {
  const consume = configureConsume(joins[JOIN_TYPES.CONSUME], interbitManifest)
  const provide = configureProvide(joins[JOIN_TYPES.PROVIDE], interbitManifest)
  const send = configureSend(joins[JOIN_TYPES.SEND], interbitManifest)
  const receive = configureReceive(joins[JOIN_TYPES.RECEIVE], interbitManifest)

  const joinActions = [...consume, ...provide, ...send, ...receive]
  log.info('JOINING', joinActions)
  for (const action of joinActions) {
    chainInterface.dispatch(action)
  }
  log.success('Chain join actions dispatched')
}

const configureConsume = (consume, interbitManifest) => {
  if (!Array.isArray(consume)) {
    return []
  }
  return consume.reduce(
    (prev, { alias: chainAlias, path: mount, joinName }) => {
      const provider = getChainIdByAlias(chainAlias, interbitManifest)
      const consumeAction = startConsumeState({
        provider,
        mount,
        joinName
      })
      return prev.concat(consumeAction)
    },
    []
  )
}

const configureProvide = (provide, interbitManifest) => {
  if (!Array.isArray(provide)) {
    return []
  }
  return provide.reduce(
    (prev, { alias: chainAlias, path: statePath, joinName }) => {
      const consumer = getChainIdByAlias(chainAlias, interbitManifest)
      const provideAction = startProvideState({
        consumer,
        statePath,
        joinName
      })
      return prev.concat(provideAction)
    },
    []
  )
}

const configureReceive = (receive, interbitManifest) => {
  if (!Array.isArray(receive)) {
    return []
  }
  return receive.reduce(
    (prev, { alias: chainAlias, authorizedActions: permittedActions }) => {
      const senderChainId = getChainIdByAlias(chainAlias, interbitManifest)
      const receiveAction = authorizeReceiveActions({
        senderChainId,
        permittedActions
      })
      return prev.concat(receiveAction)
    },
    []
  )
}

const configureSend = (send, interbitManifest) => {
  if (!Array.isArray(send)) {
    return []
  }
  return send.reduce((prev, { alias: chainAlias }) => {
    const receiverChainId = getChainIdByAlias(chainAlias, interbitManifest)
    const sendAction = authorizeSendActions({
      receiverChainId
    })
    return prev.concat(sendAction)
  }, [])
}

module.exports = configureJoins
