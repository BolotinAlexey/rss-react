import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

export default function Root() {
  return (
    <>
      <Header />
      <h1 className="title">Forms App</h1>
      <main>
        <Outlet />
      </main>
    </>
  );
}
