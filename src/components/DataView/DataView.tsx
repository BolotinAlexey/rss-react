import { Component } from 'react';
import { IPlanet, State } from '../../interfaces';
import Card from '../Card';
import getPage from '../../service/api';
import './dataView.css';

interface StateDataView {
  planets: IPlanet[];
}

export default class DataView extends Component<State, StateDataView> {
  state: StateDataView = {
    planets: [],
  };

  componentDidUpdate(prevProps: Readonly<State>): void {
    if (prevProps.name !== this.props.name || this.props.name === '') {
      getPage(1, this.props.name).then((list) => {
        this.setState({ planets: list.results });
      });
    }
  }

  render() {
    return (
      <section className="section section-list">
        <ul className="list">
          {this.state.planets.map((planet: IPlanet) => {
            return (
              <li className="list__card" key={planet.name}>
                <Card {...planet} />
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}
