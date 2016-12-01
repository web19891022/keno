import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { showModal } from 'redux/modules/modal'

export class TrophiesButton extends React.Component {

  static propTypes = {
    showModal: PropTypes.func.isRequired,
    cols: PropTypes.number,
    userTrophies: PropTypes.string
  };

  handleShowLogInModal () {
    const modalProps = Object.assign({}, this.props) // Second parameter must be object.
    this.props.showModal('trophies', modalProps)
  }

  render () {
    return (
      <span className="lobby-nav-item"
        onClick={::this.handleShowLogInModal}>
          Trophies
      </span>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    userTrophies,
    trophies
  } = state.keno
  return {
    userTrophies,
    trophies
  }
}

export default connect(mapStateToProps, {
  showModal
})(TrophiesButton)
