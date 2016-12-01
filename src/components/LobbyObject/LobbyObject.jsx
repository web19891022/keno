
import React, { PropTypes } from 'react'
// import classes from './LobbyObject.scss'

export default class LobbyObject extends React.Component {

  static propTypes = {
    value: PropTypes.string,
    image: PropTypes.string
  };

  render () {
    const image = `assets/${this.props.image}.png`
    return (
      <div className="lobby-object-wrapper">
        <img src={image} className="lobby-object-image" /> <span className="lobby-object-text">{this.props.value}</span>
      </div>
    )
  }
}
