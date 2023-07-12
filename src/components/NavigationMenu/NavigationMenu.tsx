import { navLinks } from '../../utils/variables/navLinks';
import { NavigationLink } from '../NavigationLink';

export const NavigationMenu = () => {
  return (
    <nav className="navigation-menu">
      <ul className="navigation-menu__link-list">
        {navLinks.map(({ to, label }) => (
          <li key={label} className="navigation-menu__link-list-item">
            <NavigationLink to={to} text={label} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
