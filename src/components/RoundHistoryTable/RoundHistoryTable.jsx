
import React, { PropTypes } from 'react'
// import classes from './LobbyObject.scss'
import { Row, Col } from 'react-bootstrap'
import RoundDetailedInformationBtn from
'components/Modals/Buttons/RoundDetailedInformationBtn/RoundDetailedInformationBtn'

export default class RoundHistoryTable extends React.Component {

  static propTypes = {
    games: PropTypes.array
  };

  constructor () {
    super()
    this.state = {
      'rounds': []
    }
  }

  render () {
    const games = this.props.games
    this.state.rounds = []
    let totalWon = 0
    for (let i = 1; i <= games.length; i++) {
      const index = i - 1
      console.log(123123)
      totalWon += games[index].won
      console.log(games[index])
      this.state.rounds.push(
        <RoundDetailedInformationBtn
          round={i}
          key={index}
          game={games[index]}
        />
        )
    }
    console.log(totalWon)
    return (
      <div>
        <Row>
          <Col xs={4} md={4}>
            <h4>Round</h4>
          </Col>
          <Col xs={4} md={4}>
            <h4>Hits</h4>
          </Col>
          <Col xs={4} md={4}>
            <h4>Payout</h4>
          </Col>
        </Row>
        {this.state.rounds.map((i) => {
          return (
            i
          )
        }, this)}
        <Row>
          <Col xs={12} md={6}>
            <h4>Total Won (Coins)</h4>
          </Col>
          <Col xs={12} md={6}>
            <h4>{totalWon}</h4>
          </Col>
        </Row>
      </div>
    )
  }
}
