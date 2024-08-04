import DataView from '../DataView';
import FormSearch from '../FormSearch';
import Paginator from '../Paginator';
import { useDispatch } from 'react-redux';
import { resetCurrentCard } from '../../store/slices/currentCardSlice';
import FlyOut from '../FlyOut/FlyOut';
import { useRouter } from 'next/router';
import searchString from '../../utils/searchString';
import { IPlanetResponse } from '../../interfaces';
import { useTheme } from '../../hooks/useTheme';
import styleTheme from '../../utils/styleTheme';

export default function Main({ response }: { response: IPlanetResponse }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [theme] = useTheme();
  const cls: string = theme ? 'dark' : 'light';

  const themeStyles = styleTheme(theme);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    const { target } = event;
    if (!(target instanceof HTMLElement)) return;
    if (router.pathname.includes('/details/')) {
      router.push(searchString(router));
    }
    dispatch(resetCurrentCard());
  };

  return (
    <section style={themeStyles} className={cls + 'main-wrap'}>
      <div className="left-section" onClick={handleClickOutside}>
        <h1>Planets</h1>
        <FormSearch />
        <hr />
        <DataView planets={response?.results} />
        <Paginator countPages={response?.count} />
        <FlyOut />
      </div>
      {/* <div className="right-section">
        <Outlet />
      </div> */}
    </section>
  );
}
