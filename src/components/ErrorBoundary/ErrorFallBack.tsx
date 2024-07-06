import { Component } from 'react';

interface IFallBackProps {
  errorMessage: string;
  onResetError: () => void;
}
export default class ErrorFallBack extends Component<IFallBackProps> {
  render() {
    return (
      <div className="fallback">
        <p className="fallback__title">{this.props.errorMessage}</p>
        <button onClick={this.props.onResetError}>reset error</button>
      </div>
    );
  }
}
