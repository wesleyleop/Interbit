import assert from 'assert'
import spokeCovenant from '../../interbit/spoke'
import hubCovenant from '../../interbit/hub/actions'

describe('spokeCovenant', () => {
  const chainId = '12345667'
  const chainState = spokeCovenant.initialState.setIn(
    ['interbit', 'chainId'],
    chainId
  )

  it('updates chainName on CHAIN_METADATA', () => {
    const chainName = 'secret'
    const action = spokeCovenant.actionCreators.chainMetadata({
      chainName
    })

    const afterState = spokeCovenant.smartContract(chainState, action)

    assert.strictEqual(afterState.chainMetadata.chainName, chainName)
  })

  it('updates private on PRIVATE_TOKEN', () => {
    const tokenName = 'secret'
    const value = 'I love cats!'
    const action = spokeCovenant.actionCreators.privateToken({
      tokenName,
      value
    })

    const afterState = spokeCovenant.smartContract(chainState, action)

    assert.strictEqual(afterState.privateTokens[tokenName], value)
  })

  it('updates tokenRequests on REQUEST_TOKEN', () => {
    const tokenName = 'What cats say'
    const providerChainId = '987654321'
    const justification = 'just because!'
    const action = spokeCovenant.actionCreators.requestToken({
      tokenName,
      providerChainId,
      justification
    })

    const expected = {
      tokenName,
      providerChainId
    }

    const afterState = spokeCovenant.smartContract(chainState, action)

    assert.deepStrictEqual(Object.values(afterState.tokenRequests)[0], expected)
  })

  it('adds a pending TOKEN_REQUEST action to dispatch to the hub chain on REQUEST_TOKEN', () => {
    const tokenName = 'What cats say'
    const providerChainId = '987654321'
    const justification = 'just because!'

    const action = spokeCovenant.actionCreators.requestToken({
      tokenName,
      providerChainId,
      justification
    })

    const afterState = spokeCovenant.smartContract(chainState, action)
    const pendingAction =
      afterState.interbit['sent-actions'][providerChainId]['pending-actions'][0]

    assert.strictEqual(
      pendingAction.type,
      hubCovenant.actionTypes.TOKEN_REQUEST
    )
    assert.strictEqual(pendingAction.payload.consumerChainId, chainId)
    assert.strictEqual(pendingAction.payload.tokenName, tokenName)
    assert.strictEqual(pendingAction.payload.justification, justification)
  })

  it('removes tokenRequest on MOUNT_TOKEN', () => {
    const tokenName = 'What cats say'
    const consumerRequestId = '42'
    const providerChainId = '987654321'
    const joinName = '456789012'

    const action = spokeCovenant.actionCreators.mountToken({
      tokenName,
      consumerRequestId,
      providerChainId,
      joinName
    })

    const tokenRequest = {
      tokenName,
      providerChainId
    }
    const beforeState = chainState.setIn(
      ['tokenRequests', consumerRequestId],
      tokenRequest
    )

    const afterState = spokeCovenant.smartContract(beforeState, action)
    assert.deepStrictEqual(afterState.tokenRequests, {})
  })

  it('sets up a START_CONSUME_STATE side-effect on MOUNT_TOKEN', () => {
    const tokenName = 'What cats say'
    const consumerRequestId = '42'
    const providerChainId = '987654321'
    const joinName = '456789012'

    const action = spokeCovenant.actionCreators.mountToken({
      tokenName,
      consumerRequestId,
      providerChainId,
      joinName
    })

    const afterState = spokeCovenant.smartContract(chainState, action)
    const sideEffect = afterState.sideEffects[0]
    assert.strictEqual(sideEffect.type, '@@interbit/START_CONSUME_STATE')
    assert.deepStrictEqual(sideEffect.payload, {
      provider: providerChainId,
      mount: ['providerTokens', tokenName],
      joinName
    })
  })
})
