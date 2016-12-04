/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { logIn } from '../../redux/modules/keno'
import { Grid } from 'react-bootstrap'
import FacebookLogin from 'react-facebook-login'
// import classes from './LoginView.scss'

// Use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience I've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
type Props = {
  logIn: Function
};

// Avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class LoginView extends React.Component<void, Props, void> {
  static propTypes = {
    lobbyPageLoading: PropTypes.bool.isRequired,
    logIn: PropTypes.func.isRequired
  };

  responseFacebook (response) {
    const successResponse = !!response.accessToken
    if (successResponse) {
      localStorage.clear()
      localStorage.setItem('accessToken', response.accessToken)
      localStorage.setItem('facebookUser', JSON.stringify(response))
      this.props.logIn()
    }
  }

  render () {
    return (
      <div className="background-image-wrapper">
        <Grid className="flexbox_center_center">
          <div className="auth_wrapper">
            <h1>Welcome to Golden Ball Casino <br />Social Gambling At It's Best!</h1>
            <h4>Please, login using your Facebook details below.</h4>
            <br />
            <FacebookLogin
              // appId="521810288009768"
              appId="988449867905257"
              callback={::this.responseFacebook}
              scope="public_profile, email, user_friends"
              autoLoad={false}
              />
            <br />
            {this.props.lobbyPageLoading && <h4>Loading...</h4>}
          </div>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  lobbyPageLoading: state.keno.lobbyPageLoading
})
export default connect((mapStateToProps), {
  logIn
})(LoginView)
