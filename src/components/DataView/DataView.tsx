import { Component } from 'react';
import { IPlanet, State } from '../../interfaces';
import Card from '../Card';
import getPage from '../../service/api';
import './dataView.css';
import Loader from '../Loader';

interface StateDataView {
  planets: IPlanet[];
  isLoading: boolean;
}

type PropsDataView = State;

export default class DataView extends Component<PropsDataView, StateDataView> {
  state: StateDataView = {
    planets: [],
    isLoading: false,
  };

  loadPage = async () => {
    this.setState({ isLoading: true });

    try {
      const list = await getPage(1, this.props.name);
      this.setState({ planets: list.results });
    } catch (error) {
      console.error('Failed to fetch planets', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount(): void {
    if (this.props.name === '') this.loadPage();
  }

  async componentDidUpdate(prevProps: Readonly<PropsDataView>): Promise<void> {
    if (
      prevProps.name !== this.props.name ||
      (this.props.name === '' && prevProps.name !== '')
    )
      this.loadPage();
  }

  render() {
    return (
      <section className="section section-list">
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <ul className="list">
            {this.state.planets.map((planet: IPlanet) => {
              return (
                <li className="list__card" key={planet.name}>
                  <Card {...planet} />
                </li>
              );
            })}
          </ul>
        )}
      </section>
    );
  }
}
