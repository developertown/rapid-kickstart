import { Component } from 'react';
import { IndexLink, Link } from 'react-router';

class Navigation extends Component {
  static propTypes = {
    activeClassName: React.PropTypes.string,
    className: React.PropTypes.string,
    logoutCallback: React.PropTypes.func.isRequired
  };

  static defaultProps = {
    activeClassName: '',
    className: ''
  };

  render() {
    const { loggedIn, logoutCallback } = this.props;
    
    return (
      <nav className={this.props.className}>
        {this.props.loggedIn ? (
          <ul>
            <li><a onClick={logoutCallback}>Logout</a></li>
            <li><IndexLink activeClassName={this.props.activeClassName} to='/'>Landing</IndexLink></li>
          </ul>
        ) : (
          <ul>
            <li><Link activeClassName={this.props.activeClassName} to='/login'>Login</Link></li>
          </ul>
        )}
      </nav>
    );
  }
}

export default Navigation;
