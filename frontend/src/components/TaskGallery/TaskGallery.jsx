import './TaskGallery.css';
import Task from '../Task/Task';
import { useEffect } from 'react';

const TaskGallery = ({tasks}) => {
    useEffect(() => {
        console.log('Instanciando componente...');
        console.log('Info que me llega: ', tasks);
    });

    return (
        <div className='task-gallery'>
            {tasks.length > 0 ? (
                tasks.map(task => (
                    <Task key={task.id} {...task}/>
                ))) : (
                    <p>No se encontraron tareas</p>
            )}
        </div>
        
    )
};

export default TaskGallery;
