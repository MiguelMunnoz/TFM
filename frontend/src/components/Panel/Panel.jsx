import './Panel.css';

import ImageGallery from '../ImageGallery/ImageGallery';
import taskSchema from '../Form/taskSchema';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask, removeTask } from '../../slices/taskSlice';
import { taskService, imageService } from '../../services/api';

import Modal from '../Modal/Modal';
import Form from '../Form/Form';

const Panel = ({task}) => {
    const [isEdit, setEdit] = useState(false);

    const dispatch = useDispatch();
    const visibleFields = useSelector(state => state.tasks.visibleFields);

    const trashIcon = (
    <svg 
        xmlns="http://www.w3.org/2000/svg"
        width="24" height="24" viewBox="0 0 24 24"
        fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className="feather feather-trash"
        >
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6L18.4 19.05C18.37 19.67 17.84 20.16 17.22 20.16H6.78C6.16 20.16 5.63 19.67 5.6 19.05L5 6" />
        <path d="M10 11V17" />
        <path d="M14 11V17" />
        <path d="M9 6V4C9 3.45 9.45 3 10 3H14C14.55 3 15 3.45 15 4V6" 
    /></svg>)

    const formattedDate = new Date(task.date).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                        });

    const handleDelete = (taskId) => {
        setTimeout(() => {
            taskService.delete(taskId);
            dispatch(removeTask(taskId));
        }, 500); // Debe coincidir con la duracion en CSS
    };

    const handleEdit = () => {
        setEdit(true);
    }

    const handleSave = async (taskData, imageData=undefined) => {
        try {
            if(imageData) {
                const dataImage = await imageService.upload(imageData);
                if (!dataImage) {
                    throw new Error('[ERROR] Error uploading files.');
                }
            }
            
            /*Controlamos duplicados y nos aseguramos de actualizar toda la lista de imagenes*/
            taskData = {
                ...taskData, 
                images: [...new Set([...taskData.images, ...task.images])]
            }

            const res = await taskService.update(task._id, taskData);
            console.log('Tarea actualizada: ', res.data);
            dispatch(updateTask(res.data));
            setEdit(false);
        } catch (error) {
            console.error('[ERROR] Error updating task.', error);
        }
        
    }

    return (
        <div className="panel-task-card">
            {isEdit ? (<Form 
                            title='Edit Task Form' 
                            initialData={task} 
                            fields={visibleFields} 
                            schema={taskSchema} 
                            onSubmit={(taskData, imageData)=>handleSave(taskData, imageData)}
            />):(
                <>
                    <section className="task-header">
                        <div className="task-title-status">
                            <h3 className="task-title">{task.title}</h3>
                            <span className={`task-status status-${task.status}`}>
                                {task.status}
                            </span>
                        </div>

                        <div className="task-datetime-container">
                            <div className="datetime-item">
                                <span role="img" aria-label="calendar">📅</span>
                                {formattedDate} {/* ejemplo: '05 de junio de 2024' */}
                            </div>
                            <div className="datetime-item">
                                <span role="img" aria-label="clock">🕒</span>
                                {task.time} {/* ejemplo: '19:13' */}
                            </div>
                        </div>
                    </section>

                    <section>
                        <h4>Description</h4>
                        <div className="task-description">
                            <p className="task-description-content">{task.description}</p>
                        </div>
                    </section>
                    
                    <section>
                        <ImageGallery task={task}/>
                    </section>

                    <div className="task-actions">
                        <button className="update-task-button" onClick={ () => handleEdit(task._id) }>{isEdit ? 'Save' : 'Edit'}</button>
                        <button className="delete-task-button" onClick={ () => handleDelete(task._id) }>{trashIcon}</button>
                    </div>
                </>
            )
        }            

        </div>
    )
}

export default Panel;