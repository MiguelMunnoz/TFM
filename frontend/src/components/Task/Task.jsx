import { useEffect } from 'react';
import './Task.css';

const Task = ({task, onDelete}) => {

    useEffect(()=>{
        console.log('Task Instanciada: ', task);
    }, []);

    return (
        <div className='task'>
            <div className='task-info'>
                <h3>{task.title}</h3>
                <span className={`task-status status-${task.status}`}>{task.status}</span> 
                <p className='task-date'>{task.date}</p>
                <p className='task-time'>{task.time}</p>
                <div className='description'>Description: {task.description}</div>
            </div>
            <button className='delete-button' onClick={()=>onDelete(task._id)}>X</button>
        </div>
    )
}

export default Task;