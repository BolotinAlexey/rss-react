import { Component } from 'react';
import { IPlanet } from '../../interfaces';
import transformPropsArrayToString from '../../utils/transformPropsArrayToString';
// import transformToString from '../../utils/transformToString';

// Date.prototype.toString = function dateToString() {
//   return `${this.getMonth()}/${this.getDate()} of ${this.getFullYear()}`;
// };

interface CardState {
  filmTitles: string;
  residentNames: string;
}

export default class Card extends Component<IPlanet, CardState> {
  state: CardState = {
    filmTitles: '',
    residentNames: '',
  };

  async componentDidMount() {
    const { films, residents } = this.props;
    if (films) {
      const filmTitles = await transformPropsArrayToString(films, 'title');
      this.setState({ filmTitles });
    }
    if (residents) {
      const residentNames = await transformPropsArrayToString(
        residents,
        'name'
      );
      this.setState({ residentNames });
    }
  }

  render() {
    const {url, name, films, residents, created, edited, ...restProps } =
      this.props;
    const transformProps = {
      ...restProps,
      created: created.toString().slice(0, 10),
      edited: edited.toString().slice(0, 10),
    };

    return (
      <div className="card">
        <h3>{name}</h3>
        {Object.keys(transformProps).map((key) => {
          const k = key as keyof typeof transformProps;
          return (
            <p key={k}>
              <b>{k}</b>: {String(transformProps[k])}
            </p>
          );
        })}
        {!!films?.length && <p>films: [{this.state.filmTitles}]</p>}
        {!!residents?.length && <p>residents: [{this.state.residentNames}]</p>}
        {!!url && <a href={url}>link</a>}
      </div>
    );
  }
}
