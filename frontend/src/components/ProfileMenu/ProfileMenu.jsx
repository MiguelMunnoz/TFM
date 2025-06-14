import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProfileMenu.css';

import { imageService } from '../../services/api';
import { clearUser } from '../../slices/userSlice';
import { useDispatch } from 'react-redux';

const menuItems = [
  { to: '/', label: 'Cerrar Sesión', modifier: 'logout' },
];

const ProfileMenu = () => {
    const [userImage, setUserImage] = useState(null);
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    const dispatch = useDispatch();

    useEffect(() => {
        let imageUrl = '';
        const fetchProfilePic = async (imageName) => {
            try {
                imageUrl = await imageService.getImageByName(imageName);
                setUserImage(imageUrl);
            } catch (err) {
                console.error('[ERROR] Error loading profile pic:', err);
            }
        }

        fetchProfilePic(user.profilePic);

        return () => {
            URL.revokeObjectURL(imageUrl);
        }
    }, [user.profilePic])

    return (
        <nav className="profile-menu">
            <ul className="dropdown-content">
                <div className="username-container">
                    {user.userMail}
                </div>
                <div className="profile-image-container">
                    <img className="profile-image" src={userImage} alt="Profile pic" />
                </div>
            {menuItems.map(({ to, label, modifier }) => (
                <li key={to} className={`dropdown-item dropdown-item--${modifier}`}>
                    <Link 
                        to={to} 
                        className="dropdown-item__link"
                        onClick={()=> {
                            dispatch(clearUser());
                            localStorage.removeItem('loggedUser');
                        }} 
                    >{label}</Link>
                </li>
            ))}
            </ul>
        </nav>
  )
};

export default ProfileMenu;