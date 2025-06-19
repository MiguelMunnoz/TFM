import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ProfileMenu.css';

import { imageService } from '../../services/api';
import { userService } from '../../services/api';
import { clearUser } from '../../slices/userSlice';
import { useDispatch } from 'react-redux';

const menuItems = [
  { to: '/', label: 'Cerrar Sesión', modifier: 'logout' },
];

const ProfileMenu = ({setNavBarIcon}) => {
    const [userImage, setUserImage] = useState(null);
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);

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
    }, [user.profilePic]);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await imageService.upload(formData);
            const uploadedImage = response.data.files[0];
            const newImageUrl = await imageService.getImageByName(uploadedImage);
            setUserImage(newImageUrl);
            setNavBarIcon(newImageUrl);

            const updatedUser = { ...user, profilePic: uploadedImage};
            localStorage.setItem('loggedUser', JSON.stringify(updatedUser));
            await userService.update(updatedUser.userId, {profilePic: updatedUser.profilePic});
        } catch (err) {
            console.error('[ERROR] Error uploading profile image. ', err);
        }
    };

    return (
        <nav className="profile-menu">
            <ul className="dropdown-content">
                <div className="username-container">
                    {user.userMail}
                </div>
                <div className="profile-image-container" onClick={handleImageClick}>
                    <img
                        className="profile-image"
                        src={userImage}
                        alt="Profile pic"
                        title="Click to change it"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                    />
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