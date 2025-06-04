import { useEffect } from 'react';
import './Task.css';
import {useDispatch } from 'react-redux';
import { removeTask } from '../../slices/taskSlice';
import { taskService } from '../../services/api';

const Task = (task) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        console.log('Task Instanciada: ', task);
    }, []);

    const handleDelete = (taskId) => {
        console.log('Eliminando tarea...');
        taskService.delete(taskId);
        dispatch(removeTask(taskId));
    }

    return (
        <div className='task'>
            <div className='task-info'>
                <h3>{task.title}</h3>
                <span className={`task-status status-${task.status}`}>{task.status}</span> 
                <p className='task-date'>{task.date}</p>
                <p className='task-time'>{task.time}</p>
                <div className='description'>Description: {task.description}</div>
            </div>
            <button className='delete-button' onClick={()=>handleDelete(task._id)}>X</button>
        </div>
    )
}

export default Task;