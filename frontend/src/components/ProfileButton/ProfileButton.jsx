import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProfileButton.css';

import ProfileMenu from '../ProfileMenu/ProfileMenu';

const ProfileButton = () => {
    const [isVisible, setVisibility] = useState(false);

	const handleClick = () => {
		console.log('Click...');
		setVisibility(prev => !prev);
	}

    return (
        <div className="dropdown-menu">
            <button className="drop-button" onClick={()=>handleClick()}>Mi Cuenta ▼</button>
            {isVisible && <ProfileMenu />}
        </div>
    )
}

export default ProfileButton;