const INTERBIT = 'interbit'
const CONFIG = 'config'
const ACL = 'acl'

const PATHS = {
  CHAIN_ID: [INTERBIT, 'chainId'],
  CONFIG: [INTERBIT, CONFIG],
  BLOCK_MASTER: [INTERBIT, CONFIG, 'blockMaster'],
  CONSUMING: [INTERBIT, CONFIG, 'consuming'],
  PROVIDING: [INTERBIT, CONFIG, 'providing'],
  ACL: [INTERBIT, CONFIG, ACL],
  ACTION_PERMISSIONS: [INTERBIT, CONFIG, ACL, 'actionPermissions'],
  ROLES: [INTERBIT, CONFIG, ACL, 'roles'],
  SENT_ACTIONS: [INTERBIT, 'sent-actions'],
  PENDING_ACTIONS: ['pending-actions']
}

module.exports = {
  PATHS
}
