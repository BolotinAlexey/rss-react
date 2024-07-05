import { Component } from 'react';
import { IPlanet, State } from '../../interfaces';
import Card from '../Card/Card';
import { getPage } from '../../service/api';

interface StateDataView {
  planets: IPlanet[];
}

export default class DataView extends Component<State, StateDataView> {
  state: StateDataView = {
    planets: [],
  };

  componentDidUpdate(
    prevProps: Readonly<State>
    // prevState: Readonly<StateDataView>
  ): void {
    if (prevProps.name !== this.props.name) {
      getPage(1, this.props.name).then((list) => {
        console.log(list.results);
        this.setState({ planets: list.results });
      });
    }
  }

  render() {
    return (
      <ul className="list">
        {this.state.planets.map((planet: IPlanet) => {
          return (
            <li className="list__item" key={planet.name}>
              <Card {...planet} />;
            </li>
          );
        })}
      </ul>
    );
  }
}
