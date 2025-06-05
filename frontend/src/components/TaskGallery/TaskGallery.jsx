import './TaskGallery.css';
import Task from '../Task/Task';
import { useEffect, useState } from 'react';
import {useDispatch } from 'react-redux';
import { removeTask } from '../../slices/taskSlice';
import { taskService } from '../../services/api';

const TaskGallery = ({tasks}) => {
    const [deletingTasks, setDeletingTasks] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('Instanciando componente...');
        console.log('Info que me llega: ', tasks);
    });

    const handleDelete = (taskId) => {
    // Marcar como en proceso de eliminación
    setDeletingTasks((prev) => [...prev, taskId]);

    // Esperar a que la animación termine
    setTimeout(() => {
        //onDelete(taskId); // Llamas a Redux u otra lógica externa
        taskService.delete(taskId);
        dispatch(removeTask(taskId));
        setDeletingTasks((prev) => prev.filter((id) => id !== taskId));
    }, 500); // coincide con tu duración CSS
  };

    return (
        <div className='task-gallery'>
            {tasks.length > 0 ? (
                tasks.map(task => (
                    <div
                        key={task._id}
                        className={`task-gallery-wrapper ${deletingTasks.includes(task._id) ? 'exit' : ''}`}
                    >
                        <Task key={task._id} task={task} onDelete={()=>handleDelete(task._id)}/>
                    </div>
                ))) : (
                    <p>No se encontraron tareas</p>
            )}
        </div>
        
    )
};

export default TaskGallery;
