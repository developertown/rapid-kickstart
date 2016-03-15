import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

const requireAuthentication = (ComponentToProtect) => {
  class AuthenticatedComponent extends Component {
    componentWillMount() {
      this.checkAuth(this.props.session.loggedIn);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.session.loggedIn);
    }

    checkAuth(isAuthenticated) {
      if (!isAuthenticated) {
        this.props.replaceRoute(`/login?next=${this.props.currentPath}`);
      }
    }

    render() {
      const { session } = this.props;

      let componentToRender = null;
      if (session.loggedIn === true) {
        componentToRender = <ComponentToProtect {...this.props}/>
      }

      return componentToRender;
    }
  }

  const mapStateToProps = (state, ownProps) => {
    return {
      currentPath: ownProps.location.pathname,
      session: state.session
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
