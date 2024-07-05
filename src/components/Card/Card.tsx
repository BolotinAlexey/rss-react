import { Component } from 'react';
import { IPlanet } from '../../interfaces';

export default class Card extends Component<IPlanet> {
  render() {
    const { name, ...otherProps } = this.props;
    return (
      <div className="card">
        <h3>{name}</h3>
        {Object.keys(otherProps).map((key) => {
          const k = key as keyof IPlanet;
          return (
            <p key={k}>
              {k}: {String(this.props[k])}
            </p>
          );
        })}
      </div>
    );
  }
}
