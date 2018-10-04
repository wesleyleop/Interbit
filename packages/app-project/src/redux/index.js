import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { interbitRedux, blockExplorerRedux } from 'interbit-ui-tools'
import { reducer as uiReducer } from './uiReducer'

export default combineReducers({
  form: formReducer,
  ui: uiReducer,
  interbit: interbitRedux.reducer,
  blockExplorer: blockExplorerRedux.reducer
})
