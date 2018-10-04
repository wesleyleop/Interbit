const { call, put } = require('redux-saga/effects')

const { actionCreators } = require('../actions')

function* getInterbitContext(runtimeContext) {
  const {
    getConfig,
    isInterbitLoaded,
    getInterbit,
    waitForInterbit
  } = runtimeContext

  if (isInterbitLoaded()) {
    return getInterbit()
  }

  const config = yield call(getConfig)
  yield put.resolve(actionCreators.initialConfig(config))

  yield put(actionCreators.interbitLoading())

  const { interbit, publicKey, ...rest } = yield call(waitForInterbit)

  yield put(actionCreators.interbitPublicKey(publicKey))
  yield put(actionCreators.interbitLoaded(interbit.VERSION))

  return { interbit, publicKey, ...rest }
}

module.exports = {
  getInterbitContext
}
