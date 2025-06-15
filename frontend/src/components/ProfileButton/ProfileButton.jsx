import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProfileButton.css';

import { imageService } from '../../services/api';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

const ProfileButton = () => {
    const [isVisible, setVisibility] = useState(false);
    const [userImage, setUserImage] = useState(null);
    const user = JSON.parse(localStorage.getItem('loggedUser'));

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

    const handleClick = () => {
        setVisibility(prev => !prev);
    };

    return (
        <div className="dropdown-menu">
            <button className="drop-button" onClick={handleClick}>
                <div className="profile-image-wrapper">
                    <img 
                        src={userImage} // o avatar de usuario
                        alt="Profile" 
                        className="profile-image"
                    />
                </div>
            </button>
            {isVisible && <ProfileMenu setNavBarIcon={(imageData) => setUserImage(imageData)}/>}
        </div>
    );
};

export default ProfileButton;