import './TaskGallery.css';
import Task from '../Task/Task';
import { useState } from 'react';
import {useDispatch } from 'react-redux';
import { removeTask } from '../../slices/taskSlice';
import { taskService, imageService } from '../../services/api';

const TaskGallery = ({tasks}) => {
    const [deletingTasks, setDeletingTasks] = useState([]);
    const dispatch = useDispatch();

    const handleDelete = (taskId) => {
        const images = tasks.find(task => task._id === taskId).images;

        setDeletingTasks((prev) => [...prev, taskId]);
        setTimeout(() => {            
            taskService.delete(taskId);
            dispatch(removeTask(taskId));
            setDeletingTasks((prev) => prev.filter((id) => id !== taskId));
            
            deleteImages(images);
        }, 500); // Debe coincidir con la duracion en CSS
    };

    const deleteImages = (images) => {
        images.forEach(img => {
            imageService.deleteImage(img);
        });
    }

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
                    <p>There are no matching tasks...</p>
            )}
        </div>
        
    )
};

export default TaskGallery;
