import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {

    static propTypes ={
      authenticated: PropTypes.bool
    }

    static contextTypes = {
      router: PropTypes.object
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.goBack();
      }
    }

    componentWillUpdate() {
      if (!nextProps.authenticated) {
        this.context.router.goBack();
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps({ auth }) {
    return {
      authenticated: auth.authenticated
    };
  }

  return connect(mapStateToProps)(Authentication);
}