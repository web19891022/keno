
import React, { PropTypes } from 'react'

export default class DrawnNumbersCircle extends React.Component {

  static propTypes = {
    number: PropTypes.string.isRequired
  };

  render () {
    // Change style of circle on check
    return (
      <div className="drawn-numbers-circle">
        {this.props.number}
      </div>
    )
  }
}
