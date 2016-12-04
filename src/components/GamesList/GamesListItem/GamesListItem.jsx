
import React, { PropTypes } from 'react'
// import classes from './GamesListItem.scss'

export default class GamesListItem extends React.Component {

  static propTypes = {
    name: PropTypes.string,
    minBet: PropTypes.number,
    maxBet: PropTypes.number,
    locked: PropTypes.bool,
    id: PropTypes.number,
    startGame: PropTypes.func,
    boardNumbers: PropTypes.number
  };

  handleClick () {
    this.props.startGame(this.props.id)
  }

  render () {
    let gameClassName = ''
    switch (this.props.name) {
      case 'Keno Bingo UK':
        gameClassName = 'uk_game '
        break
      case 'Keno Bingo USA':
        gameClassName = 'usa_game '
        break
      case 'Keno Blackjack':
        gameClassName = 'blackjack_game '
        break
      case 'Keno Roulette':
        gameClassName = 'roulette_game '
        break
      default:
        break
    }
    gameClassName += this.props.locked ? 'game-card' : 'game-card locked-game-list-item'
    return (
      <div className={gameClassName}
        onClick={::this.handleClick}>
        <img src="assets/lock-game.png"
          className={this.props.locked ? 'hide-locked-game' : 'locked-game-list-image'} />
        <div className="game-item-name" />
        <div className="game-item-footer">
          <div className="game-item-info">Min<br />bet<br /><span className="game-info-number">
            {this.props.minBet}</span></div>
          <div className="game-item-info game-item-info-boards">
            Boarding<br />numbers<br /><span className="game-info-number">
              {this.props.boardNumbers}</span></div>
          <div className="game-item-info">Max<br />bet<br /> <span className="game-info-number">
            {this.props.maxBet}</span></div>
        </div>
      </div>
    )
  }
}
