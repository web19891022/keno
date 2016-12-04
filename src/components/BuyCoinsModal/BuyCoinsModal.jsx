
import React, { PropTypes } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import PriceBlock from './PriceBlock/PriceBlock.jsx'
import Modal from 'react-modal'

export default class BuyCoinsModal extends React.Component {

  static propTypes = {
    modalIsOpen: PropTypes.bool,
    buyCoinsPack: PropTypes.func,
    closeModal: PropTypes.func
  };

  constructor () {
    super()
    this.state = {
      priceBlocks: [
        {id: 1, coins: 10, price: '0.50'},
        {id: 2, coins: 25, price: '1'},
        {id: 3, coins: 50, price: '1.50'},
        {id: 4, coins: 100, price: '5.00'}
      ],
      checkedBlockId: null
    }
  }

  priceBlockChecked (id) {
    this.setState({
      checkedBlockId: id
    })
  }

  buyCoins () {
    const FB = window.FB
    const coins = this.state.priceBlocks[this.state.checkedBlockId - 1].coins
    const buyCoinsPack = this.props.buyCoinsPack
    FB.ui({
      method: 'pay',
      action: 'purchaseitem',
      product: `https://kenoapp.herokuapp.com/og/coins${coins}.html`,
      quantity: '1'
    },
    (res) => {
      if (res.payment_id !== undefined) {
        buyCoinsPack(coins, res.payment_id)
      }
    }
    )
  }

  render () {
    const priceBlocks = []
    const buyButtonDissabled = this.state.checkedBlockId === null

    this.state.priceBlocks.forEach((block) => {
      const isBlockChecked = this.state.checkedBlockId === block.id
      if (isBlockChecked) {
        priceBlocks.push(
          <PriceBlock
            key={block.id}
            id={block.id}
            coins={block.coins}
            price={block.price}
            priceBlockChecked={::this.priceBlockChecked}
            checked
            />)
      } else {
        priceBlocks.push(
          <PriceBlock
            key={block.id}
            checked={false}
            id={block.id}
            coins={block.coins}
            price={block.price}
            priceBlockChecked={::this.priceBlockChecked}
            />)
      }
    })

    return (
      <div>
        <Modal
          isOpen={this.props.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.props.closeModal}
          className="Modal__Bootstrap modal-dialog" >
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.props.closeModal}>
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>
              <h4 className="modal-title">Buy more coins</h4>
            </div>
            <div className="modal-body">
              <Row>
                {priceBlocks.map((i) => {
                  return (
                    i
                  )
                }, this)}
              </Row>
              <Row>
                <Col xs={12} md={12}>
                  <Button bsStyle="primary" onClick={::this.buyCoins} disabled={buyButtonDissabled}>Buy Coins</Button>
                </Col>
              </Row>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default"
                onClick={this.props.closeModal}>
                Close
              </button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
