import React, { Component } from 'react';
import { IndexLink } from 'react-router';

import AppBar from 'react-toolbox/lib/app_bar';

import Logo from './logo';
import Navigation from './navigation';

import style from './style';
import linkStyle from 'react-toolbox/lib/link/style';

class Header extends Component {
  static propTypes = {
    loggedIn: React.PropTypes.bool.isRequired,
    activeClassName: React.PropTypes.string,
    className: React.PropTypes.string,
    logoutCallback: React.PropTypes.func.isRequired,
    appConfig: React.PropTypes.object.isRequired
  };

  static defaultProps = {
    loggedIn: false,
    activeClassName: '',
    className: ''
  };

  render() {
    const { loggedIn, logoutCallback, appConfig } = this.props;

    return (
      <AppBar className={style.appbar} >
        <IndexLink to="/" className={linkStyle.root}>
          <Logo className={style.logo} /> <span className={style.logo}>{ appConfig.appName }</span>
        </IndexLink>
        <Navigation activeClassName={style.active} className={style.navigation} loggedIn={loggedIn} logoutCallback={logoutCallback} />
      </AppBar>
    );
  }
}

export default Header;
