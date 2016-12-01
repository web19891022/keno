
import React, { PropTypes } from 'react'
import { ProgressBar } from 'react-bootstrap'

export default class XpProgressBar extends React.Component {

  static propTypes = {
    playerObject: PropTypes.object
  };

  render () {
    let perventToNextLvl = 0
    let progressBarLabel = 0
    let xpToNextLevel = 0
    if (Object.keys(this.props.playerObject).length !== 0) {
      perventToNextLvl = parseInt((this.props.playerObject.wallet.xp/this.props.playerObject.level.levelXP * 100), 0)
      progressBarLabel = `XP  ${this.props.playerObject.wallet.xp}/${this.props.playerObject.level.levelXP} (${perventToNextLvl}% To next level)`
      xpToNextLevel = this.props.playerObject.wallet.xpToNextLevel
    }
    return (
      <ProgressBar
        striped
        bsStyle="success"
        label={progressBarLabel}
        now={xpToNextLevel}
      />
    )
  }
}
