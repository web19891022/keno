import React, { PropTypes } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { hideModal } from 'redux/modules/modal'

export class RoundDetailedInformation extends React.Component {

  static propTypes = {
    hideModal: PropTypes.func.isRequired,
    game: PropTypes.object,
    round: PropTypes.Number
  };

  handleModalCloseRequest () {
    this.props.hideModal()
  }

  render () {
    const numbersMatched = this.props.game.numbersMatched.split(',')
    console.log(this.props)
    return (
      <Modal
        className="Modal__Bootstrap modal-dialog"
        onRequestClose={::this.handleModalCloseRequest}
        closeTimeoutMS={150}
        isOpen
      >
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" onClick={::this.handleModalCloseRequest}>
              <span aria-hidden="true">&times;</span>
              <span className="sr-only">Close</span>
            </button>
          </div>
          <div className="modal-body">
            <h2>Game details:</h2>
            <h4>Round - {this.props.round}</h4>
            <h4>Matched - {this.props.game.matched}</h4>
            <h4>Numbers matched - {
              numbersMatched.map((i) => {
                return (i)
              })
            }</h4>
            <h4>Won - {this.props.game.won}</h4>
          </div>
        </div>
      </Modal>
    )
  }
}

export default connect(null, {
  hideModal
})(RoundDetailedInformation)
