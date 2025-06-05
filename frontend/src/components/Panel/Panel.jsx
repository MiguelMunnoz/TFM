import './Panel.css';

const Panel = ({task, onClose}) => {
    return (
        <div className='panel'>
            <div className='task-info'>
                <h3>{task.title}</h3>
                <span className={`task-status status-${task.status}`}>{task.status}</span> 
                <p className='task-date'>{task.date}</p>
                <p className='task-time'>{task.time}</p>
                <div className='description'>Description: {task.description}</div>
            </div>
            <button className='delete-button' onClick={() => onClose()}>X</button>
        </div>
    )
}

export default Panel;