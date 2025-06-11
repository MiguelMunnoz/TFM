import { useState } from 'react';
import './SideBar.css';

import { Link } from 'react-router-dom';

const SideBar = () => {
  const [active, setActive] = useState('notas');

  const items = [
    { key: 'Tasks', label: 'Tasks', icon: '✏️' },
    { key: 'Events', label: 'Events', icon: '🎉'},
  ];

  const handleSelect = (key) => {
    setActive(key);
  };

  return (
    <aside className="sidebar">
      {items.map(item => (
        <Link 
          key={item.key}  
          to={`/${item.key.toLowerCase()}`}
          className={`link sidebar-item ${active === item.key ? 'active' : ''}`}
          onClick={() => handleSelect(item.key)}
        >  
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
        </Link>
      ))}
    </aside>
  );
};

export default SideBar;
