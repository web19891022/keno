import React, { PropTypes } from 'react'
import { Row, Col, Panel } from 'react-bootstrap'

export default class TrophiesList extends React.Component {

  static propTypes = {
    trophies: PropTypes.array
  };

  render () {
    let trophiesNodes = this.props.trophies.map((trophy, index) => {
      return (
        <Row key={index}>
          <Col
            xs={12}
            md={4}
            >
            <Panel style={{'textAlign': 'center', 'minHeight': '140px'}}>
              <img
                src="https://image.freepik.com/free-icon/trophy-cup-silhouette_318-63600.png"
                alt="trophy"
                style={{
                  'width': '50px'
                }}
                />
              <hr />
              {trophy.trophyName}
            </Panel>
          </Col>
          <Col xs={12} md={4}>
            <Panel style={{'textAlign': 'justify', 'minHeight': '140px'}}>
              {trophy.trophyDescription}
            </Panel>
          </Col>
          <Col xs={12} md={4}>
            <Panel style={{'textAlign': 'center', 'minHeight': '140px'}}>
              <img
                src="http://www.pngall.com/wp-content/uploads/2016/04/Red-Cross-Mark-Download-PNG.png"
                alt="red-cross"
                style={{
                  'width': '50px',
                  'position': 'relative',
                  'top': '30px'
                }}
                />
            </Panel>
          </Col>
        </Row>
      )
    })

    return (
      <div id="trophies">
        {trophiesNodes}
      </div>
    )
  }
}
