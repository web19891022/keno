
import React, { PropTypes } from 'react'
// import classes from './PictureProfile.scss'

export default class PictureProfile extends React.Component {

  static propTypes = {
    url: PropTypes.string
  };

  render () {
    return (
      <img src={this.props.url} className="picture-profile" />
    )
  }
}
