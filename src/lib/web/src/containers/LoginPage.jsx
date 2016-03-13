import { Component } from 'react';
import FirebaseLogin from 'rapid-firebase-authentication';
import { firebaseURL } from '../config';


class LoginPage extends Component {
  render() {
    return (
        <FirebaseLogin firebase={firebaseURL}>
          <h1>Login</h1>
          <div>
            <input name="email"/>
            <input type="password" name="password"/>
          </div>
          <div>
            <input type="submit"/>
          </div>
        </FirebaseLogin>
    );
  }
}

export default LoginPage;
