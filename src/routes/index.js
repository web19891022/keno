import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import LoginView from 'views/LoginView/LoginView'
import LobbyView from 'views/LobbyView/LobbyView'
import GameView from 'views/GameView/GameView'

import { requireAuth, loggedIn } from '../redux/utils/AuthHelpers.js'

export default (store) => (
  <Route path="/" component={CoreLayout}>
    <IndexRedirect to="/login" />
    <Route path="/login" component={LoginView} onEnter={loggedIn} />
    <Route path="/lobby" component={LobbyView} onEnter={requireAuth} />
    <Route path="/game" component={GameView} onEnter={requireAuth} />
  </Route>
)
