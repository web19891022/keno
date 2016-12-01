import { push } from 'react-router-redux'
import { sendLogInRequest,
         joinGame,
         placeBet,
         processBet,
         balanceCheck,
         getAllKenoGames,
         sendLeaveGameRequest,
         buyMoreCoins,
         getTrophies,
         getUserTrophies } from '../utils/api/APIUtils.js'
import { getUserInfo } from '../utils/FacebookHelpers.js'
import ErrorHandler from '../utils/ErrorHandler.js'
import RSVP from 'rsvp'

// ------------------------------------
// Constants
// ------------------------------------
export const PLAYER_OBJECT_RECEIVED = 'PLAYER_OBJECT_RECEIVED'
export const GAME_OBJECT_RECEIVED = 'GAME_OBJECT_RECEIVED'
export const FACEBOOK_USER_RECEIVED = 'FACEBOOK_USER_RECEIVED'
export const BUY_MORE_COINS = 'BUY_MORE_COINS'
export const ADD_TO_BET_AMOUNT = 'ADD_TO_BET_AMOUNT'
export const ADD_TO_ROUND_HISTORY = 'ADD_TO_ROUND_HISTORY'
export const SUBTRACT_FROM_BET_AMOUNT = 'SUBTRACT_FROM_BET_AMOUNT'
export const LOBBY_PAGE_LOADING = 'LOBBY_PAGE_LOADING'
export const KENO_GAMES_RECEIVED = 'KENO_GAMES_RECEIVED'
export const PROCESS_BET_OBJECT_RECEIVED = 'PROCESS_BET_OBJECT_RECEIVED'
export const IS_LOADING = 'IS_LOADING'
export const SELECT_BALLS = 'SELECT_BALLS'
export const GET_USER_TROPHIES = 'GET_USER_TROPHIES'
export const GET_TROPHIES = 'GET_TROPHIES'
export const QUICK_PICK = 'QUICK_PICK'
export const PLAY_GAME = 'PLAY_GAME'
export const BET_OBJECT_RECEIVED = 'BET_OBJECT_RECEIVED'
export const CLEAR_RESULT = 'CLEAR_RESULT'

// ------------------------------------
// Actions
// ------------------------------------
const setLoading = (dispatch, value) => {
  return (
    dispatch({
      type: IS_LOADING,
      value: value
    })
  )
}

const play = (dispatch, getState) => {
  const detail = getState().keno.selectedBalls
  const roundId = getState().keno.gameObject.id
  const gamblerId = getState().keno.playerObject.id
  const betAmount = getState().keno.betAmount
  const gameId = getState().keno.gameObject.kenoGameId

  const coinBalance = getState().keno.playerObject.wallet.coinBalance
  const playerHasEnoughCoins = (coinBalance - betAmount) >= 0

  if (playerHasEnoughCoins) {
    setLoading(dispatch, true)

    joinGame(gamblerId, gameId).then(
      (jsonGame) => {
        dispatch({
          type: GAME_OBJECT_RECEIVED,
          gameObject: jsonGame
        })
        placeBet(detail, roundId, gamblerId, betAmount).then(
          (jsonPlaceBet) => {
            dispatch({
              type: BET_OBJECT_RECEIVED,
              betObject: jsonPlaceBet
            })
            processBet(roundId, gamblerId).then(
            (jsonProcessBet) => {
              dispatch({
                type: PROCESS_BET_OBJECT_RECEIVED,
                processBetObject: jsonProcessBet
              })
              dispatch({
                type: ADD_TO_ROUND_HISTORY,
                matched: jsonProcessBet.totalNumbersMatched,
                numbersMatched: jsonProcessBet.numbersMatched,
                wonCoins: jsonProcessBet.amountWon
              })
              setLoading(dispatch, false)
              balanceCheck(gamblerId).then(
                (jsonBalanceCheck) => {
                  dispatch({
                    type: PLAYER_OBJECT_RECEIVED,
                    playerObject: jsonBalanceCheck
                  })
                })
            },
            (ex) => setLoading(dispatch, true))
          },
           (ex) => setLoading(dispatch, false))
      })
  } else {
    ErrorHandler('Not enough coins.')
  }
}

export const logIn = () => {
  return (dispatch) => {
    const facebookResponse = JSON.parse(localStorage.getItem('facebookUser'))
    dispatch({
      type: LOBBY_PAGE_LOADING
    })
    sendLogInRequest(facebookResponse.id, facebookResponse.name).then((playerObject) => {
      dispatch({
        type: PLAYER_OBJECT_RECEIVED,
        playerObject: playerObject
      })
      const promises = {
        kenoGames: getAllKenoGames(),
        userInfo: getUserInfo(facebookResponse.name, facebookResponse.id, facebookResponse.accessToken),
        trophies: getTrophies(),
        userTrophies: getUserTrophies(facebookResponse.id)
      }
      RSVP.hash(promises).then((results) => {
        dispatch({
          type: FACEBOOK_USER_RECEIVED,
          facebookUserObject: results.userInfo
        })
        dispatch({
          type: GET_TROPHIES,
          trophies: results.trophies
        })
        dispatch({
          type: GET_USER_TROPHIES,
          userTrophies: results.userTrophies
        })
        dispatch({
          type: KENO_GAMES_RECEIVED,
          kenoGames: results.kenoGames
        })
      }).then(() => {
        dispatch({
          type: LOBBY_PAGE_LOADING
        })
        dispatch(push('/lobby'))
      })
    })
  }
}

export const startGame = (gameId) => {
  return (dispatch, getState) => {
    const gamblerId = getState().keno.playerObject.id
    joinGame(gamblerId, gameId).then(
        (jsonGame) => {
          dispatch({
            type: GAME_OBJECT_RECEIVED,
            gameObject: jsonGame
          })
          dispatch(push('/game'))
        })
  }
}

export const buyCoins = (paymentId, amount) => {
  return (dispatch, getState) => {
    const gamblerId = getState().keno.playerObject.id
    const facebookId = getState().keno.facebookUserObject.userId
    buyMoreCoins(gamblerId, facebookId, amount, paymentId).then(() => {
      balanceCheck(gamblerId).then(
      (jsonBalanceCheck) => {
        dispatch({
          type: PLAYER_OBJECT_RECEIVED,
          playerObject: jsonBalanceCheck
        })
      })
    })
  }
}

export const selectBalls = (ballsNumber) => {
  return (dispatch) => {
    dispatch({
      type: SELECT_BALLS,
      balls: ballsNumber
    })
  }
}

export const quickPick = (numbers) => {
  return (dispatch) => {
    dispatch({
      type: SELECT_BALLS,
      balls: numbers
    })
  }
}

export const showModalBuyMoreCoins = () => {
  return () => {
  }
}

export const checkUserLogIn = () => {
  return (dispatch, getState) => {
    // Check if user Log in
    if (Object.keys(getState().keno.playerObject).length === 0 || getState().keno.playerObject.message !== undefined) {
      dispatch(push('/login'))
    }
  }
}

export const clearResult = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_RESULT
    })
  }
}

export const leaveGame = () => {
  return (dispatch, getState) => {
    const roundId = getState().keno.gameObject.id
    const gamblerId = getState().keno.playerObject.id
    sendLeaveGameRequest(roundId, gamblerId).then(
    () => {
      dispatch({
        type: CLEAR_RESULT
      })
      dispatch(push('/lobby'))
    })
  }
}

export const addToAmount = () => {
  return (dispatch, getState) => {
    const maxBetAmount = getState().keno.gameObject.kenoGame.kenoGameConfig.maxBet
    const increasedBet = getState().keno.betAmount + 1
    const incBetNotMoreMaxBet = increasedBet <= maxBetAmount
    const incBetNotMoreCoinBalance = increasedBet <= getState().keno.playerObject.wallet.coinBalance
    if (incBetNotMoreMaxBet && incBetNotMoreCoinBalance) {
      dispatch({
        type: ADD_TO_BET_AMOUNT
      })
    }
  }
}

export const subtractFromAmount = () => {
  return (dispatch, getState) => {
    const reducedBet = getState().keno.betAmount - 1
    const minBetAmount = getState().keno.gameObject.kenoGame.kenoGameConfig.minBet
    const reducedBetNotLessMinBet = reducedBet >= minBetAmount
    if (reducedBetNotLessMinBet) {
      dispatch({
        type: SUBTRACT_FROM_BET_AMOUNT
      })
    }
  }
}

export const playGame = () => {
  return (dispatch, getState) => {
    play(dispatch, getState)
  }
}

export const checkAuth = () => {
  return (dispatch, getState) => {
    const isUserNotLoggedIn = getState().keno.gamblerObject.id === null
    if (isUserNotLoggedIn) {
      dispatch(push('/'))
    }
  }
}

export const loopGame = (countOfGame) => {
  return (dispatch, getState) => {
    dispatch({
      type: CLEAR_RESULT
    })
    let count = 0
    const interval = setInterval(() => {
      count += 1
      if (count > countOfGame) {
        clearInterval(interval)
      } else {
        play(dispatch, getState)
      }
    }, 3000)
  }
}

export const actions = {
  logIn,
  playGame,
  clearResult,
  startGame,
  addToAmount,
  quickPick,
  buyCoins,
  loopGame,
  subtractFromAmount,
  showModalBuyMoreCoins,
  selectBalls,
  checkUserLogIn,
  checkAuth
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [PLAYER_OBJECT_RECEIVED]: (state, action) => {
    return ({ ...state, 'playerObject': action.playerObject })
  },
  [SELECT_BALLS]: (state, action) => {
    const selectedBalls = action.balls.toString()
    return ({ ...state, 'selectedBalls': selectedBalls })
  },
  [IS_LOADING]: (state, action) => {
    return ({ ...state, 'isLoading': action.value })
  },
  [BET_OBJECT_RECEIVED]: (state, action) => {
    return ({ ...state, 'betObject': action.betObject })
  },
  [CLEAR_RESULT]: (state, action) => {
    return ({ ...state, 'processBetObject': {}, betObject: {}, roundsHistory: [] })
  },
  [ADD_TO_ROUND_HISTORY]: (state, action) => {
    const roundsHistory = state.roundsHistory
    roundsHistory.push({matched: action.matched, won: action.wonCoins, numbersMatched: action.numbersMatched})
    return ({ ...state, roundsHistory: roundsHistory })
  },
  [PROCESS_BET_OBJECT_RECEIVED]: (state, action) => {
    return ({ ...state, 'processBetObject': action.processBetObject })
  },
  [GET_USER_TROPHIES]: (state, action) => {
    return ({ ...state, 'userTrophies': action.userTrophies })
  },
  [GET_TROPHIES]: (state, action) => {
    return ({ ...state, 'trophies': action.trophies })
  },
  [LOBBY_PAGE_LOADING]: (state, action) => {
    return ({ ...state, 'lobbyPageLoading': !state.lobbyPageLoading })
  },
  [GAME_OBJECT_RECEIVED]: (state, action) => {
    return ({ ...state, 'gameObject': action.gameObject,
      'betAmount': action.gameObject.kenoGame.kenoGameConfig.minBet })
  },
  [FACEBOOK_USER_RECEIVED]: (state, action) => {
    return ({ ...state, 'facebookUserObject': action.facebookUserObject })
  },
  [KENO_GAMES_RECEIVED]: (state, action) => {
    return ({ ...state, 'kenoGames': action.kenoGames })
  },
  [SUBTRACT_FROM_BET_AMOUNT]: (state, action) => {
    const subtractedBetAmount = state.betAmount - 1
    return ({ ...state, 'betAmount': subtractedBetAmount })
  },
  [ADD_TO_BET_AMOUNT]: (state, action) => {
    const betAmount = state.betAmount + 1
    return ({ ...state, 'betAmount': betAmount })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  'playerObject': {},
  'facebookUserObject': {},
  'gameObject': {
    'id': null,
    'roundStartTime': null,
    'roundEndTime': null,
    'gamblerId': null
  },
  'betObject': {},
  'roundsHistory': [],
  'betAmount': 1,
  'lobbyPageLoading': false,
  'processBetObject': {},
  'selectedBalls': '',
  'kenoGames': [],
  'userTrophies': 0,
  'trophies': [],
  'isLoading': false,
  'gameSettings': {
    'maxNumSelect': 6,
    'minNumSelect': 1,
    'minBet': 1,
    'maxBet': 1,
    'maxCountOfNumbers': 80
  }
}
export default function KenoReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
