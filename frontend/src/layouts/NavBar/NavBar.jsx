import { Link } from 'react-router-dom';
import './NavBar.css';

import ProfileButton from '../../components/ProfileButton/ProfileButton';

const NavBar = () => {

	return (
		<nav className="nav-bar">
			<div className="navMenu-container">
				<h2>TaskAPI</h2>
				<ProfileButton/>
			</div>
		</nav>
  )
}

export default NavBar;

