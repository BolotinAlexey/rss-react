import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import './root.css';
import { Provider } from 'react-redux';
import store from '../../redux/store';

export default function Root() {
  return (
    <Provider store={store}>
      <Header />
      <h1 className="title">Forms App</h1>
      <main className="container">
        <Outlet />
      </main>
    </Provider>
  );
}
