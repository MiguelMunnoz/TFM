import NavBar from '../NavBar/NavBar';
import { Outlet } from 'react-router-dom';

const AppLayout = () => (
  <div className="app">
    <NavBar />
    <div className="main-content">
      <Outlet />
    </div>
  </div>
);

export default AppLayout;
