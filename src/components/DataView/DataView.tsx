import { Component } from 'react';
import { IPlanet } from '../../interfaces';
import Card from '../Card';
import getPage from '../../service/api';
import './dataView.css';
import Loader from '../Loader';

interface StateDataView {
  planets: IPlanet[];
  isLoading: boolean;
}

interface PropsDataView {
  name: string | null;
}

export default class DataView extends Component<PropsDataView, StateDataView> {
  state: StateDataView = {
    planets: [],
    isLoading: false,
  };

  loadPage = async () => {
    this.setState({ isLoading: true });

    try {
      const list = await getPage(1, this.props.name ?? '');
      this.setState({ planets: list.results });
    } catch (error) {
      console.error('Failed to fetch planets', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  async componentDidUpdate(prevProps: Readonly<PropsDataView>): Promise<void> {
    if (
      prevProps.name !== this.props.name ||
      (this.props.name === '' && prevProps.name === null)
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
