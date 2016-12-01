
import React, { PropTypes } from 'react'
// import classes from './GamesList.scss'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import Slider from 'react-slick'

export default class FriendsList extends React.Component {

  static propTypes = {
    fbFriends: PropTypes.array
  };

  inviteFriend (e) {
    const FB = window.FB
    const id = e.target.value
    FB.ui({
      method: 'apprequests',
      title: 'Come join me on Golden Ball Keno',
      message: 'You should join me playing Golden Ball Keno.',
      to: id
    }, (response) => {
      console.log(response)
    })
  }

  render () {
    const settings = {
      dots: false,
      autoplay: true,
      swipe: false,
      arrows: false,
      speed: 700,
      infinity: true,
      slidesToShow: 5,
      slidesToScroll: 1
    }
    const friendsListItems = []
    if (this.props.fbFriends !== undefined) {
      this.props.fbFriends.map((i) => {
        friendsListItems.push(
          <div className="invite-friend-item" key={i.id}>
            <img style={{
              'margin': '0 auto',
              'marginBottom': '5px',
              'marginLeft': '25px',
              'borderRadius': '5px',
              'width': '75px',
              'border': '1px solid #09b8e8'
            }}src={i.picture.data.url} />
            <div style={{
              'color': '#00b8f5',
              'textAlign': 'center',
              'fontSize': '12px',
              'marginBottom': '5px',
              'marginLeft': '25px',
              'minHeight': '40px'
            }}>{i.name}</div>
            <Button
              value={i.id}
              bsStyle="info"
              className="friend-list-btn"
              onClick={::this.inviteFriend}>
              Invite/Add
            </Button>
          </div>)
      })
    }
    return (
      <Grid>
        <h3 className="friend-list-header">
          Friends List
          <div className="fl-header-border-corner-left" />
          <div className="fl-header-border-corner-left-radius" />
          <div className="fl-header-border-corner-right" />
          <div className="fl-header-border-corner-right-radius" />
        </h3>
        <Row>
          <Col xs={12} md={12} className="friend-list-wrapper">
            <Slider {...settings}>
              {friendsListItems.map((i) => {
                return (
                  i
                )
              }, this)}
            </Slider>
          </Col>
        </Row>
      </Grid>
    )
  }
}
