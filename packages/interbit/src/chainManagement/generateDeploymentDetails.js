const log = require('../log')

/**
 * Generates deployment details from a map of deployed chains and
 * covenants that mimics the standard Interbit manifest. Used in the
 * start script to create a `setManifest` action.
 * Set for deprecation (#263)
 * @param {Object} chainManifest - The map of chain aliases to chain ids.
 * @param {Object} covenants - The map of covenant aliases to covenant hashes.
 * @returns {Object} - Details of node deployment.
 */
const generateDeploymentDetails = (chainManifest, covenantHashes) => {
  log.info({ chainManifest, covenantHashes })
  return {
    chains: Object.entries(chainManifest).reduce(
      (chains, [alias, chainData]) => ({
        ...chains,
        [alias]: chainData.chainId
      }),
      {}
    ),
    covenants: Object.entries(covenantHashes).reduce(
      (covenants, [alias, hash]) => ({
        ...covenants,
        [alias]: { hash }
      }),
      {}
    )
  }
}

module.exports = generateDeploymentDetails
