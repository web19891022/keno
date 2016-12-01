
import React, { PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap'
import Modal from 'react-modal'

export default class GameInformationModal extends React.Component {

  static propTypes = {
    modalIsOpen: PropTypes.bool,
    gameInfo: PropTypes.string,
    closeModal: PropTypes.func
  };

  render () {
    const payTable = JSON.parse(this.props.gameInfo).paytable
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
              <h4 className="modal-title">Game information</h4>
            </div>
            <div className="modal-body">
              <h4 style={{'textAlign': 'center'}}>Hits</h4>
              <Row>
                <Col xs={2} md={2}>
                  <h4>Spots selected</h4>
                </Col>
                <Col xs={10} md={10}>
                  <table className="tg">
                    <tbody>
                      <tr>
                        <th />
                        <th className="tg-j19f">1</th>
                        <th className="tg-j19f">2</th>
                        <th className="tg-j19f">3</th>
                        <th className="tg-j19f">4</th>
                        <th className="tg-j19f">5</th>
                        <th className="tg-j19f">6</th>
                      </tr>
                      <tr>
                        <td className="tg-j19f">1</td>
                        <td className="tg-tfw5">{payTable[0].paytableitem[0].payout}</td>
                        <td className="tg-s6z2" />
                        <td className="tg-s6z2" />
                        <td className="tg-s6z2" />
                        <td className="tg-s6z2" />
                        <td className="tg-s6z2" />
                      </tr>
                      <tr>
                        <td className="tg-j19f">2</td>
                        <td className="tg-tfw5">{payTable[1].paytableitem[0].payout}</td>
                        <td className="tg-tfw5">{payTable[1].paytableitem[1].payout}</td>
                        <td className="tg-s6z2" />
                        <td className="tg-s6z2" />
                        <td className="tg-s6z2" />
                        <td className="tg-s6z2" />
                      </tr>
                      <tr>
                        <td className="tg-j19f">3</td>
                        <td className="tg-tfw5">{payTable[2].paytableitem[0].payout}</td>
                        <td className="tg-tfw5">{payTable[2].paytableitem[1].payout}</td>
                        <td className="tg-tfw5">{payTable[2].paytableitem[2].payout}</td>
                        <td className="tg-s6z2" />
                        <td className="tg-s6z2" />
                        <td className="tg-s6z2" />
                      </tr>
                      <tr>
                        <td className="tg-j19f">4</td>
                        <td className="tg-tfw5">{payTable[3].paytableitem[0].payout}</td>
                        <td className="tg-tfw5">{payTable[3].paytableitem[1].payout}</td>
                        <td className="tg-tfw5">{payTable[3].paytableitem[2].payout}</td>
                        <td className="tg-tfw5">{payTable[3].paytableitem[3].payout}</td>
                        <td className="tg-s6z2" />
                        <td className="tg-s6z2" />
                      </tr>
                      <tr>
                        <td className="tg-j19f">5</td>
                        <td className="tg-tfw5">{payTable[4].paytableitem[0].payout}</td>
                        <td className="tg-tfw5">{payTable[4].paytableitem[1].payout}</td>
                        <td className="tg-tfw5">{payTable[4].paytableitem[2].payout}</td>
                        <td className="tg-tfw5">{payTable[4].paytableitem[3].payout}</td>
                        <td className="tg-tfw5">{payTable[4].paytableitem[4].payout}</td>
                        <td className="tg-s6z2" />
                      </tr>
                      <tr>
                        <td className="tg-j19f">6</td>
                        <td className="tg-tfw5">{payTable[5].paytableitem[0].payout}</td>
                        <td className="tg-tfw5">{payTable[5].paytableitem[1].payout}</td>
                        <td className="tg-tfw5">{payTable[5].paytableitem[2].payout}</td>
                        <td className="tg-tfw5">{payTable[5].paytableitem[3].payout}</td>
                        <td className="tg-tfw5">{payTable[5].paytableitem[4].payout}</td>
                        <td className="tg-tfw5">{payTable[5].paytableitem[5].payout}</td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
              </Row>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={this.props.closeModal}>Close</button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
