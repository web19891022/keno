import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { checkUserLogIn,
          selectBalls,
          playGame,
          clearResult,
          leaveGame,
          buyCoins,
          addToAmount,
          quickPick,
          showModalBuyMoreCoins,
          loopGame,
          subtractFromAmount } from '../../redux/modules/keno'
import { Grid, Row, Col } from 'react-bootstrap'
import BigNumberCircle from 'components/BigNumberCircle/BigNumberCircle'
import DrawnNumbersCircle from 'components/DrawnNumbersCircle/DrawnNumbersCircle'
import XpProgressBar from 'components/XpProgressBar/XpProgressBar.jsx'
import PictureProfile from 'components/PictureProfile/PictureProfile.jsx'
import LeaderBoard from 'components/LeaderBoard/LeaderBoard.jsx'
import PayoutResultTable from 'components/PayoutResultTable/PayoutResultTable.jsx'
import GameInformationModal from 'components/GameInformationModal/GameInformationModal.jsx'
import BuyCoinsModal from 'components/BuyCoinsModal/BuyCoinsModal.jsx'
import Spinner from 'react-spinkit'
import $ from 'jquery'
window.jQuery = $

export class GameView extends React.Component {
  static propTypes = {
    playerObject: PropTypes.object.isRequired,
    gameSettings: PropTypes.object.isRequired,
    roundsHistory: PropTypes.array.isRequired,
    facebookUserObject: PropTypes.object.isRequired,
    gameObject: PropTypes.object.isRequired,
    checkUserLogIn: PropTypes.func.isRequired,
    buyCoins: PropTypes.func.isRequired,
    leaveGame: PropTypes.func.isRequired,
    quickPick: PropTypes.func.isRequired,
    gameMessage: PropTypes.string,
    drawnNumbers: PropTypes.string,
    userTrophies: PropTypes.string,
    numbersMatched: PropTypes.string,
    selectedBalls: PropTypes.string,
    totalNumbersMatched: PropTypes.number,
    isLoading: PropTypes.bool.isRequired,
    betAmount: PropTypes.number.isRequired,
    clearResult: PropTypes.func.isRequired,
    showModalBuyMoreCoins: PropTypes.func.isRequired,
    addToAmount: PropTypes.func.isRequired,
    loopGame: PropTypes.func.isRequired,
    subtractFromAmount: PropTypes.func.isRequired,
    playGame: PropTypes.func.isRequired,
    selectBalls: PropTypes.func.isRequired
  };

  constructor () {
    super()
    this.state = {
      'selectedNumbers': [],
      'gameInformationaModalIsOpen': false,
      'buyCoinsModalIsOpen': false,
      'circlesDisabled': false,
      'selectedNumbersCount': 0,
      'gameButtonDisabled': true,
      'clearButtonDisable': false
    }
  }

  componentDidMount () {
    // if user is not logged - redirect to login page
    this.props.checkUserLogIn()
    // Trigger action to leave game if the user closes the browser/tab
    window.onbeforeunload = () => {
      this.props.leaveGame()
    }
    const normalImages = [ 'Spade_Queen.png', 'Spade_9.png', 'Spade_5.png', 'Spade_10.png', 'Heart_A.png', 'Heart_6.png', 'Heart_2.png', 'Diamond_J.png', 'Diamond_7.png', 'Diamond_3.png', 'Club_King.png', 'Club_8.png', 'Club_4.png',
    'Spade_King.png', 'Spade_8.png', 'Spade_4.png', 'Heart_Queen.png', 'Heart_9.png', 'Heart_5.png', 'Heart_10.png', 'Diamond_A.png', 'Diamond_6.png', 'Diamond_2.png', 'Club_J.png', 'Club_7.png', 'Club_3.png',
    'Spade_J.png', 'Spade_7.png', 'Spade_3.png', 'Heart_King.png', 'Heart_8.png', 'Heart_4.png', 'Diamond_Queen.png', 'Diamond_9.png', 'Diamond_5.png', 'Diamond_10.png', 'Club_A.png', 'Club_6.png', 'Club_2.png',
    'Spade_A.png', 'Spade_6.png', 'Spade_2.png', 'Heart_J.png', 'Heart_7.png', 'Heart_3.png', 'Diamond_King.png', 'Diamond_8.png', 'Diamond_4.png', 'Club_Queen.png', 'Club_9.png', 'Club_5.png', 'Club_10.png'
    ]
    $('.Keno_Blackjack .numberCircle').each((i) => {
      const image = normalImages[Math.floor(Math.random() * normalImages.length)]
      $('.Keno_Blackjack .numberCircle').eq(i).css({'background-image': 'url(images/black_jack/normal/' + image + ')'})
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isLoading) {
      this.setState({
        'gameButtonDisabled': true,
        'clearButtonDisable': true
      })
    } else {
      this.setState({
        'gameButtonDisabled': false,
        'clearButtonDisable': false
      })
    }
    if (nextProps.selectedBalls === '') {
      this.setState({
        'gameButtonDisabled': true
      })
    }
    if (nextProps.drawnNumbers !== undefined) {
      this.setState({
        'circlesDisabled': true,
        'gameButtonDisabled': true
      })
    } else if (this.state.selectedNumbers.length <= 5) {
      this.setState({
        'circlesDisabled': false
      })
    }
  }

  clearResult () {
    this.props.clearResult()
  }

  selectNumber (selectedNumber, toAdd) {
    let selectedNumbersCount

    if (toAdd) {
      this.state.selectedNumbers.push(selectedNumber)
      selectedNumbersCount = this.state.selectedNumbersCount + 1
      this.setState({
        'selectedNumbersCount': selectedNumbersCount
      })
    } else {
      const indexOfDeletedNumber = this.state.selectedNumbers.indexOf(selectedNumber)
      this.state.selectedNumbers.splice(indexOfDeletedNumber, 1)
      selectedNumbersCount = this.state.selectedNumbersCount - 1
      this.setState({
        'selectedNumbersCount': selectedNumbersCount
      })
    }

    const maxSelectCircles = this.props.gameObject.kenoGame.kenoGameConfig.maxNumSelect
    const checkMaxCountOfCircles = selectedNumbersCount < maxSelectCircles
    if (checkMaxCountOfCircles) {
      this.setState({
        'circlesDisabled': false
      })
    } else {
      this.setState({
        'circlesDisabled': true
      })
    }

    // Enable/disable game button
    if (selectedNumbersCount !== 0) {
      this.setState({
        'gameButtonDisabled': false
      })
    } else {
      this.setState({
        'gameButtonDisabled': true
      })
    }
    this.props.selectBalls(this.state.selectedNumbers)
  }

  playGame () {
    this.props.playGame()
  }

  exitGame () {
    this.props.leaveGame()
  }

  addToAmount () {
    this.props.addToAmount()
  }

  subtractFromAmount () {
    this.props.subtractFromAmount()
  }

  playFiveGames () {
    this.props.loopGame(5)
  }

  playTenGames () {
    this.props.loopGame(10)
  }

  quickPick () {
    const maxNumSelect = this.props.gameSettings.maxNumSelect
    const maxCountOfNumbers = this.props.gameSettings.maxCountOfNumbers
    const quickPick = []
    while (quickPick.length < maxNumSelect) {
      const randomNumber = Math.ceil(Math.random() * maxCountOfNumbers)
      let found = false
      for (let i = 0; i < quickPick.length; i++) {
        if (quickPick[i] === randomNumber) { found = true; break }
      }
      if (!found) quickPick.push(randomNumber)
    }
    this.props.quickPick(quickPick)
    this.setState({
      gameButtonDisabled: false,
      circlesDisabled: true,
      selectedNumbersCount: 6,
      selectedNumbers: quickPick
    })
  }

  showGameInformation () {
    this.setState({
      'gameInformationaModalIsOpen': true
    })
  }

  closeGameInformation () {
    this.setState({
      'gameInformationaModalIsOpen': false
    })
  }

  showBuyCoinsModal () {
    this.setState({
      'buyCoinsModalIsOpen': true
    })
  }

  closeBuyCoinsModal () {
    this.setState({
      'buyCoinsModalIsOpen': false
    })
  }

  buyCoinsPack (paymentId, coins) {
    this.props.buyCoins(coins, paymentId)
  }

  render () {
    const numberCircles = []
    const maxRenderedCircles = this.props.gameObject.kenoGame.kenoGameConfig.boardNumbers
    const gameStyleName = this.props.gameObject.kenoGame.name.split(' ').join('_')
    for (let i = 1; i <= maxRenderedCircles; i++) {
      if (!this.state.selectedNumbers.find((o) => { return o === i })) {
        const disabledCircle =
        this.state.selectedNumbers.length === this.props.gameObject.kenoGame.kenoGameConfig.maxNumSelect
        numberCircles.push(
          <BigNumberCircle
            number={i}
            key={i}
            drawnNumbers={this.props.drawnNumbers}
            selectNumber={::this.selectNumber}
            disabled={disabledCircle}
            checked={false}
          />)
      } else {
        numberCircles.push(
          <BigNumberCircle
            number={i}
            key={i}
            drawnNumbers={this.props.drawnNumbers}
            selectNumber={::this.selectNumber}
            disabled={false}
            checked
          />)
      }
    }
    const drawnNumberCircles = []
    if (this.props.drawnNumbers !== undefined) {
      const drawnNumbers = this.props.drawnNumbers.split(',')
      drawnNumbers.forEach((item) => {
        drawnNumberCircles.push(
          <DrawnNumbersCircle
            number={item}
            key={item}
          />)
      })
    }
    const numbersMatchedCircles = []
    if (this.props.totalNumbersMatched !== undefined && this.props.totalNumbersMatched !== 0) {
      const numbersMatched = this.props.numbersMatched.split(',')
      numbersMatched.sort()
      numbersMatched.forEach((item) => {
        numbersMatchedCircles.push(
          <DrawnNumbersCircle
            number={item}
            key={item}
          />)
      })
    }
    let totalNumbersMatched = ''
    if (this.props.totalNumbersMatched !== undefined) {
      totalNumbersMatched = this.props.totalNumbersMatched
    }
    console.log(this.props.isLoading)
    return (
      <Grid fluid className={gameStyleName}>
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
                      {this.props.playerObject.wallet.coinBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                    </span>
                  </div>
                </Col>
                <Col xs={6} md={2} className="col-lobby-object menu-devider">
                  <div className="lobby-object-wrapper">
                    <img src="assets/goldbars-icon.png" className="lobby-object-image" />
                    <span className="lobby-object-text">
                      {this.props.playerObject.wallet.barBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                    </span>
                  </div>
                </Col>
                <Col xs={6} md={2} className="col-lobby-object menu-devider">
                  <div className="lobby-object-wrapper">
                    <img src="assets/goldball-icon.png" className="lobby-object-image" />
                    <span className="lobby-object-text">
                      {this.props.playerObject.wallet.ballBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                    </span>
                  </div>
                </Col>
                <Col xs={6} md={2} className="col-lobby-object menu-devider">
                  <div className="lobby-object-wrapper">
                    <img src="assets/level-icon.png" className="lobby-object-image" />
                    <span className="lobby-object-text">
                      {this.props.playerObject.level.displayLevelInfo}
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
                    Welcome back {this.props.facebookUserObject.name} {this.props.playerObject.level.levelStatus}
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
            <Col xs={12} md={12}>
              <div className="game-name-header" />
            </Col>
          </Row>
          <Row style={{'position': 'relative'}}>
            <div className="grid">
              <div className="grid--fit">
                <PayoutResultTable
                  paytableItems={JSON.parse(this.props.gameObject.kenoGame.kenoGameConfig.payTable).paytable}
                  rounds={this.props.roundsHistory}
                  selectedNumbersCount={this.state.selectedNumbersCount}
                  />
              </div>
              <div className="grid--30 numberCircles">
                <div id="numberCircles">
                  {numberCircles.map((i) => {
                    return (
                      i
                    )
                  }, this)}
                </div>
              </div>
              <div className="grid--fit">
                <LeaderBoard
                  playerObject={this.props.playerObject}
                  facebookUserObject={this.props.facebookUserObject}
                  />
              </div>
            </div>
          </Row>
          <Row style={{'marginBottom': '10px'}}>
            <div className="grid">
              <div className="grid--fit game-btn-flex-wrapper">
                <button
                  className="btn-buy-more-coins"
                  onClick={::this.showBuyCoinsModal}>
                  <img src="assets/coins-icon.png" />
                  <span>BUY MORE COINS</span>
                </button>
                <BuyCoinsModal
                  modalIsOpen={this.state.buyCoinsModalIsOpen}
                  buyCoinsPack={::this.buyCoinsPack}
                  closeModal={::this.closeBuyCoinsModal} />
              </div>
              <div className="grid--30 numberCircles numbers-matched-title-wrapper">
                {totalNumbersMatched !== '' && <h3 className="numbers-matched-title">{totalNumbersMatched} NUMBERS MATCHED</h3>}
              </div>
              <div className="grid--fit game-btn-flex-wrapper">
                <button
                  className="btn-game-information"
                  onClick={::this.showGameInformation}>
                  <span>GAME INFORMATION</span>
                </button>
                <GameInformationModal
                  modalIsOpen={this.state.gameInformationaModalIsOpen}
                  closeModal={::this.closeGameInformation}
                  gameInfo={this.props.gameObject.kenoGame.kenoGameConfig.payTable} />
              </div>
            </div>
          </Row>
          <div className="game-footer">
            <div className="game-footer-circles-matched">
              {numbersMatchedCircles.map((i) => {
                return (
                  i
                )
              }, this)}
            </div>
            <div className="game-footer-btn-bet">
              <button
                className="btn-clear-result"
                disabled={this.state.clearButtonDisable}
                onClick={::this.clearResult}>
                <span>CLEAR RESULT</span>
              </button>
              <div className="btn-bet-group">
                <button
                  className="btn-subtact"
                  onClick={::this.subtractFromAmount} />
                <div className="bet-amount">
                  {this.props.betAmount}
                </div>
                <button
                  className="btn-increase"
                  onClick={::this.addToAmount} />
              </div>
              <button
                className="btn-quick-pick"
                onClick={::this.quickPick}>
                  QUICK PICK
              </button>
            </div>
            <div className="game-footer-bottom">
              <button
                className="btn-exit-game"
                onClick={::this.exitGame}
                >
                EXIT GAME
              </button>
              <button
                className="btn-play-count"
                onClick={::this.playFiveGames}
                disabled={this.state.gameButtonDisabled}
                >
                PLAY 5
              </button>
              <button
                className="btn-play-game"
                onClick={::this.playGame}
                disabled={this.state.gameButtonDisabled}
                >
                PLAY GAME
                {this.props.isLoading && <Spinner spinnerName="three-bounce" noFadeIn />}
              </button>
              <button
                className="btn-play-count"
                onClick={::this.playTenGames}
                disabled={this.state.gameButtonDisabled}
                >
                PLAY 10
              </button>
            </div>
          </div>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  playerObject: state.keno.playerObject,
  facebookUserObject: state.keno.facebookUserObject,
  roundsHistory: state.keno.roundsHistory,
  gameObject: state.keno.gameObject,
  isLoading: state.keno.isLoading,
  betAmount: state.keno.betAmount,
  userTrophies: state.keno.userTrophies,
  gameMessage: state.keno.processBetObject.gameMessage,
  selectedBalls: state.keno.selectedBalls,
  drawnNumbers: state.keno.processBetObject.resultDetail,
  totalNumbersMatched: state.keno.processBetObject.totalNumbersMatched,
  numbersMatched: state.keno.processBetObject.numbersMatched,
  gameSettings: state.keno.gameSettings
})
export default connect((mapStateToProps), {
  checkUserLogIn,
  clearResult,
  leaveGame,
  quickPick,
  showModalBuyMoreCoins,
  loopGame,
  buyCoins,
  addToAmount,
  subtractFromAmount,
  playGame,
  selectBalls
})(GameView)
