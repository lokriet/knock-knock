import React, { Component } from 'react';

import Error from '../components/UI/Error/Error';

export class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: { message: '', stack: '' },
    info: { componentStack: '' }
  };

  static getDerivedStateFromError = error => {
    return { hasError: true };
  };

  componentDidCatch = (error, info) => {
    this.setState({ error, info });
  };

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    return hasError ? (
      <div style={{textAlign: 'center'}}>
        <Error error="Something went wrong :( Please reload the page"/>
      </div>
     ) : children;
  }
}
