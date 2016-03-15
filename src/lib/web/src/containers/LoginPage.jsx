import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import { sessionActions } from '../actions';

import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';

import FirebaseLogin from 'rapid-firebase-authentication';
import { firebase } from '../config';


class LoginPage extends Component {
  state = { email: '', password: ''};

  handleChange(name, value) {
    this.setState({...this.state, [name]: value});
  }

  onAuthSuccess(authData) {
    this.setState({...this.state, password: ''});
    this.props.onLogin(authData);
    this.props.replaceRoute(this.props.nextPath || "/");
  }

  componentWillMount() {
    if (this.props.loggedIn) {
      this.props.replaceRoute(this.props.nextPath || "/");
    }
  }

  render() {
    return (
        <FirebaseLogin
          firebase={firebase}
          onAuthSuccess={::this.onAuthSuccess}
        >
          <h3>Login</h3>
          <div>
            <Input type="text" name="email" label="Email" value={this.state.email} onChange={this.handleChange.bind(this, 'email')}/>
            <Input type="password" name="password" label="Password" value={this.state.password} onChange={this.handleChange.bind(this, 'password')}/>
          </div>
          <div>
            <Button type="submit" label="Login" primary/>
          </div>
        </FirebaseLogin>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    nextPath: ownProps.location.query.next,
    loggedIn: state.session.loggedIn
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onLogin: sessionActions.login,
    onLogout: sessionActions.logout,
    replaceRoute: replace
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
