/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { startGame, logIn } from '../../redux/modules/keno'
import GamesList from 'components/GamesList/GamesList.jsx'
import FriendsList from 'components/FriendsList/FriendsList.jsx'
import XpProgressBar from 'components/XpProgressBar/XpProgressBar.jsx'
import PictureProfile from 'components/PictureProfile/PictureProfile.jsx'
import LeaderBoard from 'components/LeaderBoard/LeaderBoard.jsx'
import TrophiesButton from 'components/Modals/Buttons/TrophiesButton/TrophiesButton'
import { Grid, Row, Col } from 'react-bootstrap'
import { FacebookButton } from 'react-social-sharebuttons'
import Spinner from 'react-spinkit'
// import classes from './LoginView.scss'

// Use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience I've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
type Props = {
  startGame: Function
};

// Avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class LobbyView extends React.Component<void, Props, void> {
  static propTypes = {
    playerObject: PropTypes.object.isRequired,
    kenoGames: PropTypes.array.isRequired,
    lobbyPageLoading: PropTypes.bool.isRequired,
    userTrophies: PropTypes.string,
    startGame: PropTypes.func,
    logIn: PropTypes.func,
    facebookUserObject: PropTypes.object.isRequired
  };

  componentWillMount () {
    this.props.logIn()
  }

  handleLogOut () {
    window.localStorage.clear()
    window.location.href = '/login'
  }

  render () {
    let coinBalance = ''
    let barBalance = ''
    let ballBalance = ''
    let levelNumber = ''
    let levelStatus = ''
    if (Object.keys(this.props.playerObject).length !== 0) {
      coinBalance = this.props.playerObject.wallet.coinBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      barBalance = this.props.playerObject.wallet.barBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      ballBalance = this.props.playerObject.wallet.ballBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      levelNumber = this.props.playerObject.level.displayLevelInfo
      levelStatus = this.props.playerObject.level.levelStatus
    }
    return (
      <div className="background-image-wrapper">
        {this.props.lobbyPageLoading ? <Spinner spinnerName="double-bounce" noFadeIn /> : <div>
          <Grid>
            <Row className="lobby-header-row">
              <Col xs={12} md={3}>
                <img src="assets/bg_logo.png" alt="logo" className="lobby-header-logo" />
              </Col>
              <Col xs={12} md={8}>
                <Row className="lobby-object-wrapper-row">
                  <Col xs={6} md={2} className="col-lobby-object menu-devider">
                    <div className="lobby-object-wrapper">
                      <img src="assets/coins-icon.png" className="lobby-object-image" />
                      <span className="lobby-object-text">
                        {coinBalance}
                      </span>
                    </div>
                  </Col>
                  <Col xs={6} md={2} className="col-lobby-object menu-devider">
                    <div className="lobby-object-wrapper">
                      <img src="assets/goldbars-icon.png" className="lobby-object-image" />
                      <span className="lobby-object-text">
                        {barBalance}
                      </span>
                    </div>
                  </Col>
                  <Col xs={6} md={2} className="col-lobby-object menu-devider">
                    <div className="lobby-object-wrapper">
                      <img src="assets/goldball-icon.png" className="lobby-object-image" />
                      <span className="lobby-object-text">
                        {ballBalance}
                      </span>
                    </div>
                  </Col>
                  <Col xs={6} md={2} className="col-lobby-object menu-devider">
                    <div className="lobby-object-wrapper">
                      <img src="assets/level-icon.png" className="lobby-object-image" />
                      <span className="lobby-object-text">
                        {levelNumber}
                      </span>
                    </div>
                  </Col>
                  <Col xs={6} md={2} className="col-lobby-object menu-devider">
                    <div className="lobby-object-wrapper">
                      <img src="assets/trophy-icon.png" className="lobby-object-image"
                        style={{'position': 'relative', 'bottom': '3px'}} />
                      <span className="lobby-object-text">
                        {this.props.userTrophies}
                      </span>
                    </div>
                  </Col>
                  <Col xs={6} md={2} className="col-lobby-object menu-devider">
                    <div className="lobby-object-wrapper lobby-object-welcome-text">
                      Welcome back {this.props.facebookUserObject.name} {levelStatus}
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col xs={0} md={1}>
                <PictureProfile url={this.props.facebookUserObject.picture} />
              </Col>
              <Col xs={12} md={12} style={{'textAlign': 'center'}} className="no-padding">
                <XpProgressBar playerObject={this.props.playerObject} />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12} className="no-padding">
                <Col xs={12} md={9} className="no-padding">
                  <nav className="lobby-nav">
                    <span className="lobby-nav-item lobby-nav-item-border-radius-left">
                      My account
                    </span>
                    <span className="lobby-nav-item">
                      Shop
                    </span>
                    <TrophiesButton />
                    <span className="lobby-nav-item">
                      Leaderbord
                    </span>
                    <span className="lobby-nav-item">
                      Mini league
                    </span>
                    <span className="lobby-nav-item">
                      Suggestions
                    </span>
                    <span className="lobby-nav-item lobby-nav-item-border-radius-right">
                      Support
                    </span>
                  </nav>
                </Col>
                <Col xs={0} md={1} />
                <Col xs={12} md={2} className="no-padding">
                  <span className="lobby-fb-like-btn">
                    <Col xs={6} md={6}>
                      <FacebookButton url="kenoapp.herokuapp.com" layout="button_count" share={false} showFaces={false} />
                    </Col>
                    <Col xs={6} md={6} style={{'textAlign': 'right'}}>
                      <a className="logout-btn" onClick={::this.handleLogOut}>Logout</a>
                    </Col>
                  </span>
                </Col>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={10}>
                <GamesList
                  startGame={this.props.startGame}
                  kenoGames={this.props.kenoGames}
                  />
              </Col>
              <Col xs={0} md={1} />
              <Col xs={12} md={2}>
                <LeaderBoard playerObject={this.props.playerObject} facebookUserObject={this.props.facebookUserObject} />
              </Col>
            </Row>
          </Grid>
          <Grid fluid className="friend-list-grid-fluid">
            <div>
              <FriendsList fbFriends={this.props.facebookUserObject.friends} />
            </div>
          </Grid>
        </div>}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  playerObject: state.keno.playerObject,
  kenoGames: state.keno.kenoGames,
  userTrophies: state.keno.userTrophies,
  lobbyPageLoading: state.keno.lobbyPageLoading,
  facebookUserObject: state.keno.facebookUserObject
})
export default connect((mapStateToProps), {
  startGame, logIn
})(LobbyView)
