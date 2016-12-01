import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import keno from './modules/keno'
import modal from './modules/modal'

export default combineReducers({
  keno,
  modal,
  router
})
