import { Link } from 'react-router-dom';
import './ProfileMenu.css';

import { clearUser } from '../../slices/userSlice';
import { useDispatch } from 'react-redux';

const menuItems = [
  { to: '/', label: 'Cerrar Sesión', modifier: 'logout' },
];

const ProfileMenu = () => {
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    console.log('Email del usuario loggeado: ', user.userMail);
    const dispatch = useDispatch();

    return (
        <nav className="profile-menu">
            <ul className="dropdown-content">
                <div className="username-container">
                    {user.userMail}
                </div>
                <div className="profile-image-container">

                </div>
            {menuItems.map(({ to, label, modifier }) => (
                <li key={to} className={`dropdown-item dropdown-item--${modifier}`}>
                    <Link 
                        to={to} 
                        className="dropdown-item__link"
                        onClick={()=>dispatch(clearUser())} 
                    >{label}</Link>
                </li>
            ))}
            </ul>
        </nav>
  )
};

export default ProfileMenu;