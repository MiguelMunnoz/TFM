import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProfileButton.css';

import ProfileMenu from '../ProfileMenu/ProfileMenu';

const ProfileButton = () => {
    const [isVisible, setVisibility] = useState(false);

    const handleClick = () => {
        setVisibility(prev => !prev);
    };

    return (
        <div className="dropdown-menu">
            <button className="drop-button" onClick={handleClick}>
                <div className="profile-image-wrapper">
                    <img 
                        src="/path/to/profile.jpg" // o avatar de usuario
                        alt="Profile" 
                        className="profile-image"
                    />
                </div>
            </button>
            {isVisible && <ProfileMenu />}
        </div>
    );
};

export default ProfileButton;