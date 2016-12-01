
import React, { PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap'
import RoundDetailedInformationBtn from
'components/Modals/Buttons/RoundDetailedInformationBtn/RoundDetailedInformationBtn'
// import classes from './PayoutResultTable.scss'

export default class PayoutResultTable extends React.Component {

  static propTypes = {
    paytableItems: PropTypes.Array,
    selectedNumbersCount: PropTypes.Number,
    rounds: PropTypes.Array
  };

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
    let payTable = this.props.paytableItems.find((e) => {
      return parseInt(e.numberspicked, 0) === parseInt(this.props.selectedNumbersCount, 0)
    })
    if (payTable) { payTable = payTable.paytableitem } else {
      payTable = []
    }

    let totalWon = 0
    const playedRounds = []
    const rounds = this.props.rounds
    for (let i = 1; i <= rounds.length; i++) {
      const index = i - 1
      totalWon += rounds[index].won
      playedRounds.push(
        <RoundDetailedInformationBtn
          round={i}
          key={index}
          game={rounds[index]}
        />
        )
    }

    return (
      <div className="payout-table" style={{'position': 'relative', 'display': 'flex', 'flexDirection': 'column', 'height': '100%'}}>
        <h3 className="table-payout-header">
          Payout
        </h3>
        <h3 className="table-results-header">
          Results
        </h3>
        <Row style={{'color': 'white', 'margin': '0px', 'flex': '1'}}>
          <Col xs={5} md={5} className="no-padding game-table-paytable-header">
            <Col xs={5} md={5} className="no-padding">
              <span>Hits</span>
            </Col>
            <Col xs={7} md={7} className="no-padding">
              <span>Payouts</span>
            </Col>
          </Col>
          <Col xs={7} md={7} className="no-padding game-table-result-header">
            <Col xs={4} md={4} className="no-padding">
              <span>Round</span>
            </Col>
            <Col xs={3} md={3} className="no-padding">
              <span>Hits</span>
            </Col>
            <Col xs={5} md={5} className="no-padding">
              <span>Payout</span>
            </Col>
          </Col>
        </Row>
        <Row className="game-table-content">
          <Col xs={5} md={5} className="no-padding">
            {payTable.map((e) => {
              return (
                <div className="game-table-content-payout">
                  <Col xs={5} md={5} className="no-padding">
                    <span>{e.matched}</span>
                  </Col>
                  <Col xs={7} md={7} className="no-padding">
                    <span>{this.numberFormatter(e.payout)}</span>
                  </Col>
                </div>
              )
            })}

          </Col>
          <Col xs={7} md={7} className="no-padding">
            {playedRounds.map((i) => {
              return (
                i
              )
            }, this)}
          </Col>
        </Row>
        <div className="game-table-footer">
          <h4>Total Win</h4>
          <img src="assets/coins-icon.png" />
          <h3>{this.numberFormatter(totalWon)}</h3>
        </div>
      </div>
    )
  }
}
