import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

const requireAuthentication = (ComponentToProtect) => {
  class AuthenticatedComponent extends Component {
    static propTypes = {
      replaceRoute: React.PropTypes.func.isRequired,
      loggedIn: React.PropTypes.bool.isRequired,
      currentPath: React.PropTypes.string.isRequired
    };

    static defaultProps = {
      loggedIn: false
    };

    componentWillMount() {
      this.checkAuth(this.props.loggedIn);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.loggedIn);
    }

    checkAuth(isAuthenticated) {
      if (!isAuthenticated) {
        this.props.replaceRoute(`/login?next=${this.props.currentPath}`);
      }
    }

    render() {
      const { loggedIn } = this.props;

      let componentToRender = null;
      if (loggedIn === true) {
        componentToRender = <ComponentToProtect {...this.props}/>
      }

      return componentToRender;
    }
  }

  const mapStateToProps = (state, ownProps) => {
    return {
      currentPath: ownProps.location.pathname,
      loggedIn: state.session.loggedIn
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      replaceRoute: replace
    }, dispatch);
  };

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
};

export default requireAuthentication;
