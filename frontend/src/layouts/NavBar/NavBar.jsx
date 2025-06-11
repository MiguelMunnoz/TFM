import { Link } from 'react-router-dom';
import './NavBar.css';

import ProfileButton from '../../components/ProfileButton/ProfileButton';

const NavBar = () => {

	return (
		<nav className="nav-bar">
			<div className="navMenu-container">
				<ProfileButton/>
			</div>
		</nav>
  )
}

export default NavBar;

