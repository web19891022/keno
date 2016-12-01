
import React, { PropTypes } from 'react'
import { Panel, Col } from 'react-bootstrap'
import classes from './PriceBlock.scss'

export default class PriceBlock extends React.Component {

  static propTypes = {
    priceBlockChecked: PropTypes.func,
    coins: PropTypes.number,
    id: PropTypes.number,
    checked: PropTypes.bool,
    price: PropTypes.string
  };

  handleBlockClick () {
    this.props.priceBlockChecked(this.props.id)
  }

  render () {
    const style = this.props.checked ? classes.priceBlockChecked : ''
    return (
      <Col xs={12} md={3}>
        <Panel className={style} onClick={::this.handleBlockClick}>
          {this.props.coins} coins <br /> £{this.props.price}
        </Panel>
      </Col>
    )
  }
}
