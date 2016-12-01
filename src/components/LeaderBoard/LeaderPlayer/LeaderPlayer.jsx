
import React, { PropTypes } from 'react'

export default class LeaderPlayed extends React.Component {

  static propTypes = {
    player: PropTypes.object,
    id: PropTypes.number
  };

  constructor () {
    super()
    this.state = {
      'picture': ''
    }
  }

  addSuffix (number) {
    let j = number % 10
    let k = number % 100
    if (j === 1 && k !== 11) {
      return number + 'st'
    }
    if (j === 2 && k !== 12) {
      return number + 'nd'
    }
    if (j === 3 && k !== 13) {
      return number + 'rd'
    }
    return number + 'th'
  }

  render () {
    const pictureUrl = `http://graph.facebook.com/${this.props.player.facebookId}/picture`
    console.log(pictureUrl)
    return (
      <div className="leader-player-wrapper">
        <div className="leader-player-header">
          <div className="leader-player-header-left" />
          <h5 className="leader-player-suffix">{this.addSuffix(this.props.id)}</h5>
          <div className="leader-player-avatar">
            <img src={pictureUrl} />
          </div>
          <h5 className="leader-player-name"><span>{this.props.player.gamblerName}</span></h5>
        </div>
        <div className="leader-player-gold">
          <img src="assets/coins-icon.png" width="24px" />
          <div>{this.props.player.coinsWon.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</div>
        </div>
      </div>
    )
  }
}
