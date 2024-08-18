import { NavLink } from 'react-router-dom';
import './header.css';

export default function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <NavLink className="nav__link" to="/">
          Main
        </NavLink>
        <NavLink className="nav__link" to="/uncontrolled">
          Uncontrolled Form
        </NavLink>
        <NavLink className="nav__link" to="/controlled">
          React Hook Form
        </NavLink>
      </nav>
    </header>
  );
}
