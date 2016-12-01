
import React, { PropTypes } from 'react'

export default class BigNumberCircle extends React.Component {

  static propTypes = {
    number: PropTypes.number.isRequired,
    disabled: PropTypes.bool.isRequired,
    checked: PropTypes.bool.isRequired,
    drawnNumbers: PropTypes.string,
    selectNumber: PropTypes.func.isRequired
  };

  constructor () {
    super()
    this.state = {
      'checked': true
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.checked !== !nextProps.checked) {
      this.setState({
        checked: !nextProps.checked
      })
    }
  }

  handleClick () {
    if (!this.state.checked && !(this.props.drawnNumbers !== undefined)) {
      this.addNumber()
    } else if (!this.props.disabled) {
      this.addNumber()
    }
  }

  addNumber () {
    this.props.selectNumber(this.props.number, this.state.checked)
    this.setState({
      'checked': !this.state.checked
    })
  }

  render () {
    // Change style of circle on check
    const circleStyle = this.state.checked ? ' numberCircle ' : ' numberCircleChecked '
    let mouseArrowStyle
    if ((this.props.disabled && !this.state.checked) || (!this.props.disabled && !this.state.checked)) {
      mouseArrowStyle = ' numberCirclePointer '
    } else if (!this.props.disabled) {
      mouseArrowStyle = ' numberCirclePointer '
    } else {
      mouseArrowStyle = ' numberCircleDisabled '
    }
    if (this.props.disabled && this.props.drawnNumbers !== undefined) {
      mouseArrowStyle = ' numberCircleDisabled '
    }
    let style = `${circleStyle} ${mouseArrowStyle}`
    if (this.props.drawnNumbers !== undefined) {
      const numbersMatched = this.props.drawnNumbers.split(',')
      numbersMatched.forEach((item) => {
        if (Number(item) === this.props.number && !this.state.checked) {
          style += ' numberCircleMathed '
        } else if (Number(item) === this.props.number) {
          style += ' numberCircleDrawn '
        }
      })
    }
    return (
      <div className={style} onClick={::this.handleClick}>
        <span><div>{this.props.number}</div></span>
      </div>
    )
  }
}
