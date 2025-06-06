import { Link } from 'react-router-dom';
import './ProfileMenu.css';

const menuItems = [
  { to: '/myProfile', label: 'Mi Perfil', modifier: 'profile' },
  { to: '/config', label: 'Config', modifier: 'config' },
  { to: '/', label: 'Cerrar Sesión', modifier: 'logout' },
];

const ProfileMenu = () => {

    return (
        <nav className="profile-menu">
            <ul className="dropdown-content">
            {menuItems.map(({ to, label, modifier }) => (
                <li key={to} className={`dropdown-item dropdown-item--${modifier}`}>
                    <Link to={to} className="dropdown-item__link" >{label}</Link>
                </li>
            ))}
            </ul>
        </nav>
  )
};

export default ProfileMenu;