import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { showModal } from 'redux/modules/modal'
import { Col } from 'react-bootstrap'
// import classes from './LoginButton.scss'

export class RoundDetailedInformationBtn extends React.Component {

  static propTypes = {
    showModal: PropTypes.func.isRequired,
    round: PropTypes.number,
    game: PropTypes.object
  };

  handleShowLogInModal () {
    const modalProps = Object.assign({}, this.props) // Second parameter must be object.
    this.props.showModal('roundDetails', modalProps)
  }

  numberFormatter (num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G'
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
    }
    return num
  }

  render () {
    const matched = this.props.game !== undefined ? this.props.game.matched : ''
    console.log(this.props)
    return (
      <div
        onClick={::this.handleShowLogInModal}
        style={{
          'cursor': 'pointer'
        }}
        className="round-details-btn"
      >
        <Col xs={4} md={4} className="no-padding">
          <span>{this.props.round}</span>
        </Col>
        <Col xs={4} md={3} className="no-padding">
          <span>{matched}</span>
        </Col>
        <Col xs={4} md={5} className="no-padding">
          <span>{this.numberFormatter(this.props.game.won)}</span>
        </Col>
      </div>
    )
  }
}

export default connect(null, {
  showModal
})(RoundDetailedInformationBtn)
