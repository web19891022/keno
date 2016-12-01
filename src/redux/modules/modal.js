// ------------------------------------
// Constants
// ------------------------------------
export const SHOW_MODAL = 'SHOW_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'

// ------------------------------------
// Actions
// ------------------------------------
export const showModal = (modalType, modalProps) => {
  return (dispatch) => {
    dispatch({
      type: 'SHOW_MODAL',
      modalType: modalType,
      modalProps: modalProps
    })
  }
}

export const hideModal = () => {
  return (dispatch) => {
    dispatch({
      type: 'HIDE_MODAL'
    })
  }
}

export const actions = {
  showModal,
  hideModal
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SHOW_MODAL]: (state, action) => {
    return ({ ...state, modalType: action.modalType, modalProps: action.modalProps })
  },
  [HIDE_MODAL]: (state, action) => { return (initialState) }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  modalType: null,
  modalProps: {}
}
export default function ModalReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
