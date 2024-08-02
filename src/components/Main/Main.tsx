import DataView from '../DataView';
import FormSearch from '../FormSearch';
// import Paginator from '../Paginator';
import { useDispatch } from 'react-redux';
import { resetCurrentCard } from '../../store/slices/currentCardSlice';
import FlyOut from '../FlyOut/FlyOut';
import { useRouter } from 'next/router';
import searchString from '../../utils/searchString';
import { IPlanet } from '../../interfaces';

export default function Main({ data }: { data: IPlanet[] }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    const { target } = event;
    if (!(target instanceof HTMLElement)) return;
    if (router.pathname.includes('/details/')) {
      router.push(searchString(router));
    }
    dispatch(resetCurrentCard());
  };

  return (
    <section className="main-wrap">
      <div className="left-section" onClick={handleClickOutside}>
        <h1>Planets</h1>
        <FormSearch />
        <hr />
        <DataView planets={data} />
        {/* <Paginator /> */}
        <FlyOut />
      </div>
      {/* <div className="right-section">
        <Outlet />
      </div> */}
    </section>
  );
}
