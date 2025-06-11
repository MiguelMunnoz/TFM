import NavBar from '../NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import { Outlet } from 'react-router-dom';

import './AppLayout.css';

const AppLayout = () => (
<div className="app">
	<NavBar />
	<div className="main-content">
		<SideBar/>
		<Outlet />
	</div>
</div>
);

export default AppLayout;
