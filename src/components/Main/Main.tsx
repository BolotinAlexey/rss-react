import { useState } from 'react';
import DataView from '../DataView';
import FormSearch from '../FormSearch';
import './main.css';
import Paginator from '../Paginator';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function Main() {
  const [name, setName] = useState<null | string>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmitNameApp = (name: string) => {
    setName(name);
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    const { target } = event;
    if (!(target instanceof HTMLElement)) return;
    if (
      !target.closest('.list__card') &&
      !target.closest('.details') &&
      location.pathname.includes('/details/')
    ) {
      navigate(`/${location.search}`, { replace: true });
    }
  };

  return (
    <section className="secton main" onClick={handleClickOutside}>
      <h1>Planets</h1>
      <FormSearch onSubmitName={onSubmitNameApp} />
      <hr />
      <DataView name={name} />
      <Paginator />
      <Outlet />
    </section>
  );
}
