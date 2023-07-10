import { NavLink } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  to: string,
  text: string,
};

export const NavigationLink: React.FC<Props> = ({ to, text }) => (
  <NavLink
    to={to}
    className={({ isActive }) => cn('nav-item', {
      'nav-item--active': isActive,
    })}
  >
    {text}
  </NavLink>
);
