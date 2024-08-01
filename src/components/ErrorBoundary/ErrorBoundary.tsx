import { Component, ReactNode, ErrorInfo } from 'react';
import ErrorFallBack from './ErrorFallBack';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  errorMessage: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    errorMessage: '',
  };

  static getDerivedStateFromError(error: Error) {
    return { errorMessage: error.toString() };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log(error.toString(), info.componentStack);
  }

  handleResetError = () => {
    this.setState({ errorMessage: '' });
  };

  render() {
    return this.state.errorMessage ? (
      <ErrorFallBack
        onResetError={this.handleResetError}
        errorMessage={this.state.errorMessage}
      />
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
