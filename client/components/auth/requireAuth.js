import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {

    static contextTypes = {
      router: PropTypes.object
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.goBack();
      }
    }

    componentWillUpdate() {
      console.log('next', this.props.authenticated)
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