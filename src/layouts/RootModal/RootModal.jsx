import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import RoundDetailedInformation from 'components/Modals/RoundDetailedInformation/RoundDetailedInformation'
import TrophiesModal from 'components/Modals/TrophiesModal/TrophiesModal'

const MODAL_COMPONENTS = {
  'roundDetails': RoundDetailedInformation,
  'trophies': TrophiesModal
}

const RootModal = ({ modalType, modalProps }) => {
  if (!modalType) {
    return <span />
  }

  const SpecificModal = MODAL_COMPONENTS[modalType]
  return <SpecificModal {...modalProps} />
}

RootModal.propTypes = {
  modalType: PropTypes.string,
  modalProps: PropTypes.object
}

export default connect(
  state => state.modal
)(RootModal)
