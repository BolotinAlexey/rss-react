import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <NavLink className="nav__link" to="/">
          Main
        </NavLink>
        <NavLink className="nav__link" to="/uncontroled">
          Uncontroled Form
        </NavLink>
        <NavLink className="nav__link" to="/controled">
          React Hook Form
        </NavLink>
      </nav>
    </header>
  );
}
