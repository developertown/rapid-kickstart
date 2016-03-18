import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import 'react-toolbox/lib/commons';
import ToolboxApp from 'react-toolbox/lib/app';

import * as config from '../../config';
import Header from '../../components/header';
import * as actions from '../../actions';

import style from './style';



class App extends Component {
  static propTypes = {
    restoreSession: React.PropTypes.func.isRequired,
    logoutCallback: React.PropTypes.func.isRequired,
    loggedIn: React.PropTypes.bool.isRequired,
    children: React.PropTypes.object
  };

  static defaultProps = {
    children: {}
  };

  componentWillMount() {
    this.props.restoreSession();
  }

  render() {
    const { loggedIn, logoutCallback } = this.props;

    return (
        <ToolboxApp>
          <Header loggedIn={loggedIn} logoutCallback={logoutCallback} appConfig={config} />
          <section className={style.content}>
            {this.props.children}
          </section>
        </ToolboxApp>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.session.loggedIn
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logoutCallback: actions.sessionActions.logout,
    restoreSession: actions.sessionActions.restoreSession
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
