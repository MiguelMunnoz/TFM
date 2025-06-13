import { Link } from 'react-router-dom';
import './ProfileMenu.css';

const menuItems = [
  { to: '/', label: 'Cerrar Sesión', modifier: 'logout' },
];

const ProfileMenu = () => {

    return (
        <nav className="profile-menu">
            <ul className="dropdown-content">
                <div className="username-container">
                    Nombre: Miguel
                </div>
                <div className="profile-image-container">

                </div>
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