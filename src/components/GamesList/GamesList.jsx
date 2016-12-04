
import React, { PropTypes } from 'react'
// import classes from './GamesList.scss'
import { Col } from 'react-bootstrap'
import GameListItem from './GamesListItem/GamesListItem.jsx'

export default class GamesList extends React.Component {

  static propTypes = {
    kenoGames: PropTypes.array,
    startGame: PropTypes.func
  };

  render () {
    const gamesListItems = []
    this.props.kenoGames.map((i) => {
      gamesListItems.push(
        <GameListItem
          key={i.name}
          name={i.name}
          id={i.id}
          startGame={this.props.startGame}
          minBet={i.kenoGameConfig.minBet}
          maxBet={i.kenoGameConfig.maxBet}
          locked={i.isActive}
          boardNumbers={i.kenoGameConfig.boardNumbers}
        />)
    })
    return (
      <Col xs={12} md={12} className="text-center">
        <h3 className="text-center game-seaction-header">Game List</h3>
        {gamesListItems.map((i) => {
          return (
            i
          )
        }, this)}
      </Col>
    )
  }
}
