import { useState } from 'react';
import './SideBar.css';

const SideBar = ({ onSelect }) => {
  const [active, setActive] = useState('notas');

  const items = [
    { key: 'Tasks', label: 'Tasks', icon: '✏️' },
    { key: 'Events', label: 'Events', icon: '🎉'},
  ];

  const handleSelect = (key) => {
    setActive(key);
    if (onSelect) onSelect(key);
  };

  return (
    <aside className="sidebar">
      {items.map(item => (
        <div
          key={item.key}
          className={`sidebar-item ${active === item.key ? 'active' : ''}`}
          onClick={() => handleSelect(item.key)}
        >
          <span className="icon">{item.icon}</span>
          <span className="label">{item.label}</span>
        </div>
      ))}
    </aside>
  );
};

export default SideBar;
