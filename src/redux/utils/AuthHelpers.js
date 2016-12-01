export function getAuthToken () {
  return JSON.parse(localStorage.getItem('accessToken'))
}

export function setAuthToken (token) {
  localStorage.setItem('accessToken', JSON.stringify(token))
}

export function removeAuthToken () {
  localStorage.removeItem('accessToken')
}

export function requireAuth (nextState, replace) {
  const loggedIn = !!localStorage.accessToken
  if (!loggedIn) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export function loggedIn (nextState, replace) {
  const loggedIn = !!localStorage.accessToken
  if (loggedIn) {
    replace({
      pathname: '/lobby',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
