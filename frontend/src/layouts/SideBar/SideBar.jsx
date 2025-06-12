import { useLocation, Link } from 'react-router-dom';
import './SideBar.css';

const SideBar = () => {
	const location = useLocation();

	const items = [
	{ key: 'Tasks', label: 'Tasks', icon: '✏️' },
	{ key: 'Events', label: 'Events', icon: '🎉' },
	];

	const activeKey = items.find(item =>
	location.pathname.startsWith(`/${item.key.toLowerCase()}`)
	)?.key;

	return (
	<aside className="sidebar">
		{items.map(item => (
		<Link 
			key={item.key}  
			to={`/${item.key.toLowerCase()}`}
			className={`link sidebar-item ${activeKey === item.key ? 'active' : ''}`}
		>  
			<span className="icon">{item.icon}</span>
			<span className="label">{item.label}</span>
		</Link>
		))}
	</aside>
	);
};

export default SideBar;
