export const APIConstants = {
  'SERVER_NAME': 'https://kenoapp.azurewebsites.net/',
  'KENO_GAMES': 'api/KenoGames/',
  'LEAVE_GAME': '/api/leavegame',
  'BUY_COINS': 'api/shoptransactions',
  'LOG_IN': 'api/socialgamblers/', // http://{servername}/gamblersname/{playerName}
  'JOIN_GAME': 'api/playkenogame/', //  http://{servername}/api/kenorounds
  'PLACE_BET': 'api/bets/', // http://{servername}/api/bets
  'PROCESS_BET': 'api/processround/', // http://{servername}/api/processround/{roundId}/gamblerId/{gamblerId}
  'GET_TROPHIES': 'api/KenoTrophies/',
  'GET_USER_TROPHIES': 'api/GamblerTrophies/',
  'BALANCE_CHECK': 'gamblers/' // http://{servername}/gamblers/{gambler.Id}
}
