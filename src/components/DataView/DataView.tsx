import { Component } from 'react';
import { IPlanet, State } from '../../interfaces';

interface StateDataView {
  planet: IPlanet | null;
}

export default class DataView extends Component<State, StateDataView> {
  state: StateDataView = {
    planet: null,
  };

  componentDidUpdate(
    prevProps: Readonly<State>
    // prevState: Readonly<StateDataView>
  ): void {
    if (prevProps.name !== this.props.name) {
      console.log(this.props.name);
    }
  }

  render() {
    return <p>{this.props.name}</p>;
  }
}
