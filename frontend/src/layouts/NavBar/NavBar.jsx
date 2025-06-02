import { Link } from 'react-router-dom';
import './NavBar.css';

import ProfileButton from '../../components/ProfileButton/ProfileButton';

const NavBar = () => {

	return (
		<nav className="nav-bar">
			<div className="navMenu-container">
				<ul>
					<li className='navMenu-item'>
						<Link to="/tasks">Tasks</Link>
					</li>
					<li className='navMenu-item'>
						<Link to="/events">Events</Link>
					</li>
					<li className='navMenu-item'>
						<Link to="/images">Images</Link>
					</li>
				</ul>

				<ProfileButton/>
			</div>
		</nav>
  )
}

export default NavBar;

