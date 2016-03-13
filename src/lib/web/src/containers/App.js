import { Component } from 'react';
import NavLink from '../components/NavLink'

class App extends  Component {
  render() {
    return (
        <div>
          <h1>Let's Prototype!</h1>
          <ul role="nav">
            <li><NavLink to="/" onlyActiveOnIndex>Landing Page</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
          </ul>
          {this.props.children}
        </div>
    )
  }
}

export default App;