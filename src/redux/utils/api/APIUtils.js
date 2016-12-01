import { APIConstants } from './APIConstants.js'
import fetch from 'isomorphic-fetch'
import ErrorHandler from '../ErrorHandler.js'
import moment from 'moment'
import toastr from 'toastr'

export function sendLogInRequest (facebookId, facebookName) {
  return new Promise((resolve, reject) => {
    fetch(`${APIConstants.SERVER_NAME}${APIConstants.LOG_IN}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache'
      },
      body: JSON.stringify({
        'facebookid': facebookId,
        'gamblername': facebookName
      })
    }).then((res) => res.json())
    .then((jsonRes) => {
      console.log(jsonRes)
      resolve(jsonRes)
    }).catch((ex) => {
      ErrorHandler(ex)
    })
  })
}

export function getTrophies () {
  return new Promise((resolve, reject) => {
    fetch(`${APIConstants.SERVER_NAME}${APIConstants.GET_TROPHIES}`)
          .then((responseTrophies) => responseTrophies.json())
          .then((jsonTrophies) => {
            resolve(jsonTrophies)
          }).catch((ex) => {
            ErrorHandler(ex)
          })
  })
}

export function getUserTrophies (playerId) {
  return new Promise((resolve, reject) => {
    fetch(`${APIConstants.SERVER_NAME}${APIConstants.GET_USER_TROPHIES}${playerId}`)
          .then((responseTrophies) => responseTrophies.json())
          .then((jsonTrophies) => {
            resolve(jsonTrophies)
          }).catch((ex) => {
            ErrorHandler(ex)
          })
  })
}

export function buyMoreCoins (gamblerId, facebookId, coins, paymentId) {
  const description = `${coins} Gold Coins Purchased – Id: ${paymentId}`
  return new Promise((resolve, reject) => {
    fetch(`${APIConstants.SERVER_NAME}${APIConstants.BUY_COINS}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache'
      },
      body: JSON.stringify({
        'facebookid': facebookId,
        'amount': coins,
        'description': description
      })
    }).then((res) => {
      const options = {
        'closeButton': true,
        'progressBar': true,
        'showDuration': '300',
        'hideDuration': '1000',
        'timeOut': '5000'
      }
      toastr.success(`You have successfully bought ${coins} coins`, options)
      resolve(res)
    }).catch((ex) => {
      ErrorHandler(ex)
    })
  })
}

export function joinGame (gamblerId, gameId) {
  const roundStartTime = moment().utcOffset('2013-03-07T07:00:00-08:00') // ISO8601 formatted string
  return new Promise((resolve, reject) => {
    fetch(`${APIConstants.SERVER_NAME}${APIConstants.JOIN_GAME}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache'
      },
      body: JSON.stringify({
        'Id': 0,
        'RoundStartTime': roundStartTime,
        'RoundEndTime': null,
        'Gambler': null,
        'GamblerId': gamblerId,
        'KenoGameId': gameId,
        'KenoGame': null
      })
    }).then(
      (responseGame) => responseGame.json())
      .then((jsonGame) => {
        resolve(jsonGame)
      }).catch((ex) => {
        ErrorHandler(ex)
      })
  })
}

export function placeBet (detail, roundId, gamblerId, betAmount) {
  return new Promise((resolve, reject) => {
    fetch(`${APIConstants.SERVER_NAME}${APIConstants.PLACE_BET}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache'
      },
      body: JSON.stringify({
        'detail': detail,
        'roundId': roundId,
        'betamount': betAmount,
        'gamblerId': gamblerId
      })
    }).then((responsePlaceBet) => responsePlaceBet.json())
      .then((jsonPlaceBet) => {
        resolve(jsonPlaceBet)
      })
      .catch((ex) => {
        ErrorHandler(ex)
        reject(ex)
      })
  })
}

export function processBet (roundId, gamblerId) {
  return new Promise((resolve, reject) => {
    fetch(`${APIConstants.SERVER_NAME}${APIConstants.PROCESS_BET}${roundId}/gamblerId/${gamblerId}`)
      .then((responseProcessBet) => responseProcessBet.json())
      .then((jsonProcessBet) => {
        resolve(jsonProcessBet)
        if (jsonProcessBet.message !== undefined) {
          throw jsonProcessBet.message
        }
      })
      .catch((ex) => {
        ErrorHandler(ex)
        reject(ex)
      })
  })
}

export function balanceCheck (gamblerId) {
  return new Promise((resolve, reject) => {
    fetch(`${APIConstants.SERVER_NAME}${APIConstants.BALANCE_CHECK}${gamblerId}`)
     .then((responseBalanceCheck) => responseBalanceCheck.json())
     .then((jsonBalanceCheck) => {
       resolve(jsonBalanceCheck)
     })
      .catch((ex) => {
        ErrorHandler(ex)
      })
  })
}

export function getAllKenoGames () {
  return new Promise((resolve, reject) => {
    fetch(`${APIConstants.SERVER_NAME}${APIConstants.KENO_GAMES}`)
     .then((kenoGames) => kenoGames.json())
     .then((jsonKenoGames) => {
       resolve(jsonKenoGames)
     })
      .catch((ex) => {
        ErrorHandler(ex)
      })
  })
}

export function sendLeaveGameRequest (roundId, gamblerId) {
  return new Promise((resolve, reject) => {
    fetch(`${APIConstants.SERVER_NAME}${APIConstants.LEAVE_GAME}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache'
      },
      body: JSON.stringify({
        'roundId': roundId,
        'gamblerId': gamblerId
      })
    }).then((responseLeaveGame) => resolve(responseLeaveGame))
      .catch((ex) => {
        ErrorHandler(ex)
        reject(ex)
      })
  })
}
