const assert = require('assert')
const Immutable = require('seamless-immutable')
const { selectors } = require('../../middleware')

const {
  entireTree,
  getBlockMaster,
  getChain,
  getChainAliases,
  getChainId,
  getConfiguredChains,
  getConfiguredPeers,
  getInterbitStatus,
  getPublicKey,
  getSponsorConfig,
  interbitSubtree,
  isChainLoaded
} = selectors

describe('middleware.selectors', () => {
  const blockMaster = 'xk0EW1JjZQECALi9QKGYNTEa3o5O6i3mC...'

  const chainAlias1 = 'NoodlesAppPublic'
  const chainAlias2 = 'MyNoodles'

  const sponsorConfig = {
    blockMaster,
    sponsorChainId: '456789...',
    covenantHash: '876543...'
  }

  const chainId1 = '123456...'
  const chainState1 = {
    interbit: { chainId: chainId1, config: { blockMaster } },
    privateChainHosting: {
      [chainAlias2]: sponsorConfig
    }
  }

  const chainId2 = '789012...'
  const chainState2 = {
    ramen: ['noodles', 'soup', 'love'],
    interbit: { chainId: chainId2, config: { blockMaster } }
  }

  const middlewareState = Immutable.from({
    bootReactApp: chainAlias1,
    status: 'READY',
    publicKey: 'xk0EW2IFQgECAKY8gkAVo6LyqbYeL6iQO...',
    chains: {
      [chainAlias1]: chainState1,
      [chainAlias2]: chainState2
    },
    chainData: {
      [chainAlias1]: { status: 'BLOCKING' },
      [chainAlias2]: { status: 'LOADED' }
    },
    peers: ['mydomain.com:443'],
    version: '0.99.0'
  })

  const storeState = { interbit: middlewareState }

  describe('retrieves expected values from store', () => {
    it('interbitSubtree()', () => {
      assert.deepStrictEqual(interbitSubtree(storeState), middlewareState)
    })
    it('getChainAliases()', () => {
      assert.deepStrictEqual(getChainAliases(storeState), [
        chainAlias1,
        chainAlias2
      ])
    })
    it('getChain()', () => {
      assert.deepStrictEqual(
        getChain(storeState, { chainAlias: chainAlias2 }),
        chainState2
      )
    })
    it('getChainId()', () => {
      assert.deepStrictEqual(
        getChainId(storeState, { chainAlias: chainAlias2 }),
        chainId2
      )
    })
    it('getBlockMaster()', () => {
      assert.deepStrictEqual(
        getBlockMaster(storeState, { chainAlias: chainAlias2 }),
        blockMaster
      )
    })
    it('getSponsorConfig()', () => {
      assert.deepStrictEqual(
        getSponsorConfig(storeState, {
          publicChainAlias: chainAlias1,
          privateChainAlias: chainAlias2
        }),
        sponsorConfig
      )
    })
    it('isChainLoaded() - chain has BLOCKING status', () => {
      assert.strictEqual(
        isChainLoaded(storeState, { chainAlias: chainAlias1 }),
        true
      )
    })
    it('isChainLoaded() - chain has another status', () => {
      assert.strictEqual(
        isChainLoaded(storeState, { chainAlias: chainAlias2 }),
        false
      )
    })
    it('getPublicKey()', () => {
      assert.strictEqual(getPublicKey(storeState), middlewareState.publicKey)
    })
    it('getInterbitStatus()', () => {
      assert.strictEqual(getInterbitStatus(storeState), middlewareState.status)
    })
    it('getConfiguredPeers()', () => {
      assert.deepStrictEqual(
        getConfiguredPeers(storeState),
        middlewareState.peers
      )
    })
    it('getConfiguredChains()', () => {
      assert.deepStrictEqual(
        getConfiguredChains(storeState),
        middlewareState.chainData
      )
    })
  })

  describe('can read values from reducer state', () => {
    it('getChainAliases()', () => {
      assert.deepStrictEqual(
        getChainAliases(middlewareState, { subtree: entireTree }),
        [chainAlias1, chainAlias2]
      )
    })
    it('getChain()', () => {
      assert.deepStrictEqual(
        getChain(middlewareState, {
          chainAlias: chainAlias2,
          subtree: entireTree
        }),
        chainState2
      )
    })
    it('getChainId()', () => {
      assert.deepStrictEqual(
        getChainId(middlewareState, {
          chainAlias: chainAlias2,
          subtree: entireTree
        }),
        chainId2
      )
    })
    it('getBlockMaster()', () => {
      assert.deepStrictEqual(
        getBlockMaster(middlewareState, {
          chainAlias: chainAlias2,
          subtree: entireTree
        }),
        blockMaster
      )
    })
    it('getSponsorConfig()', () => {
      assert.deepStrictEqual(
        getSponsorConfig(middlewareState, {
          publicChainAlias: chainAlias1,
          privateChainAlias: chainAlias2,
          subtree: entireTree
        }),
        sponsorConfig
      )
    })
    it('isChainLoaded() - chain has BLOCKING status', () => {
      assert.strictEqual(
        isChainLoaded(middlewareState, {
          chainAlias: chainAlias1,
          subtree: entireTree
        }),
        true
      )
    })
    it('isChainLoaded() - chain has another status', () => {
      assert.strictEqual(
        isChainLoaded(middlewareState, {
          chainAlias: chainAlias2,
          subtree: entireTree
        }),
        false
      )
    })
    it('getPublicKey()', () => {
      assert.strictEqual(
        getPublicKey(middlewareState, { subtree: entireTree }),
        middlewareState.publicKey
      )
    })
    it('getInterbitStatus()', () => {
      assert.strictEqual(
        getInterbitStatus(middlewareState, { subtree: entireTree }),
        middlewareState.status
      )
    })
    it('getConfiguredPeers()', () => {
      assert.deepStrictEqual(
        getConfiguredPeers(middlewareState, { subtree: entireTree }),
        middlewareState.peers
      )
    })
    it('getConfiguredChains()', () => {
      assert.deepStrictEqual(
        getConfiguredChains(middlewareState, { subtree: entireTree }),
        middlewareState.chainData
      )
    })
  })

  describe('provides sensible default without throwing', () => {
    it('interbitSubtree()', () => {
      assert.deepStrictEqual(interbitSubtree(), {})
    })
    it('getChainAliases()', () => {
      assert.deepStrictEqual(getChainAliases(), [])
    })
    it('getChain(): unknown chain alias', () => {
      const chainAlias = 'UNKNOWN'
      assert.deepStrictEqual(getChain(storeState, { chainAlias }), {})
    })
    it('getChain()', () => {
      assert.deepStrictEqual(getChain(), {})
    })
    it('getChainId(): unknown chain alias', () => {
      const chainAlias = 'UNKNOWN'
      assert.strictEqual(getChainId(storeState, { chainAlias }), undefined)
    })
    it('getChain()', () => {
      assert.strictEqual(getChainId(), undefined)
    })
    it('getBlockMaster(): unknown chain alias', () => {
      const chainAlias = 'UNKNOWN'
      assert.strictEqual(getBlockMaster(storeState, { chainAlias }), undefined)
    })
    it('getBlockMaster()', () => {
      assert.strictEqual(getBlockMaster(), undefined)
    })
    it('getSponsorConfig(): unknown chain alias', () => {
      const chainAlias = 'UNKNOWN'
      assert.deepStrictEqual(
        getSponsorConfig(storeState, {
          publicChainAlias: chainAlias1,
          privateChainAlias: chainAlias
        }),
        {}
      )
    })
    it('getSponsorConfig()', () => {
      assert.deepStrictEqual(getSponsorConfig(), {})
    })
    it('isChainLoaded(): unknown chain alias', () => {
      const chainAlias = 'UNKNOWN'
      assert.strictEqual(isChainLoaded(storeState, { chainAlias }), false)
    })
    it('isChainLoaded()', () => {
      assert.strictEqual(isChainLoaded(), false)
    })
    it('getPublicKey()', () => {
      assert.strictEqual(getPublicKey(), undefined)
    })
    it('getInterbitStatus()', () => {
      assert.strictEqual(getInterbitStatus(), 'UNKNOWN')
    })
    it('getConfiguredPeers()', () => {
      assert.deepStrictEqual(getConfiguredPeers(), [])
    })
    it('getConfiguredChains()', () => {
      assert.deepStrictEqual(getConfiguredChains(), {})
    })
  })
})
