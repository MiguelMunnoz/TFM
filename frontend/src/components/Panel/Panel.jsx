import './Panel.css';

import ImageGallery from '../ImageGallery/ImageGallery';
import taskSchema from '../Form/taskSchema';
import eventSchema from '../Form/eventSchema';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask, removeTask } from '../../slices/taskSlice';
import { updateEvent, removeEvent } from '../../slices/eventSlice';
import { taskService, eventService, imageService } from '../../services/api';

import Modal from '../Modal/Modal';
import Form from '../Form/Form';

const Panel = ({task, event}) => {
    const item = task || event;
    const isTask = !!task;
    const [isEdit, setEdit] = useState(false);

    const dispatch = useDispatch();
    const visibleFields = useSelector(state =>
        isTask ? state.tasks.visibleFields : state.events.visibleFields
    );

    const mapIcon = (
        <svg className="map-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            >
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
            <line x1="8" y1="2" x2="8" y2="18" />
            <line x1="16" y1="6" x2="16" y2="22" />
        </svg>
        )
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

    const formattedDate = new Date(item.date).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                        });

    const handleDelete = (id) => {
        const service = isTask ? taskService : eventService;
        const action = isTask ? removeTask : removeEvent;

        setTimeout(() => {
            service.delete(id);
            dispatch(action(id));
        }, 500);
    };

    const handleEdit = () => {
        setEdit(true);
    }

    const handleSave = async (data, imageData=undefined) => {
        const service = isTask ? taskService : eventService;
        const updateAction = isTask ? updateTask : updateEvent;
        try {
            if(imageData) {
                const dataImage = await imageService.upload(imageData);
                if (!dataImage) {
                    throw new Error('[ERROR] Error uploading files.');
                }
            }
            
            /*Controlamos duplicados y nos aseguramos de actualizar toda la lista de imagenes*/
            data = {
                ...data,
                images: [...new Set([...(data.images || []), ...(item.images || [])])]
            };
            
            const res = await service.update(item._id, data);
            dispatch(updateAction(res.data));
            setEdit(false);
            console.log('Tarea actualizada: ', res.data);
        } catch (error) {
            console.error('[ERROR] Error updating task.', error);
        }
        
    }

    return (
        <div className="panel-task-card">
            {isEdit ? (
                <Form
                    title={`Edit ${isTask ? 'Task' : 'Event'} Form`}
                    initialData={item}
                    fields={visibleFields}
                    schema={isTask ? taskSchema : eventSchema}
                    onSubmit={handleSave}
                />
            ):(
                <>
                    <section className="task-header">
                        <div className="task-title-status">
                            <h3 className="task-title">{item.title}</h3>
                            <span className={`task-status status-${item.status}`}>
                                {item.status}
                            </span>
                        </div>

                        <div className="task-datetime-container">
                            <div className="datetime-item">
                                <span role="img" aria-label="calendar">📅</span>
                                {formattedDate} 
                            </div>
                            <div className="datetime-item">
                                <span role="img" aria-label="clock">🕒</span>
                                {item.time} 
                            </div>
                        </div>
                    </section>

                    <section>
                        <h4>Description</h4>
                        {isTask ? (
                            <div className="task-description">
                                <p className="task-description-content">{item.description}</p>
                            </div>
                        ) : (
                            <div className="task-description">
                                <p className="task-description-content">{item.details}</p>
                            </div>
                        )}
                    </section>
                    
                    {isTask &&
                        <section>
                            <ImageGallery task={item}/>
                        </section>
                     }

                    <div className="task-actions">
                        <button 
                            className="update-task-button" 
                            onClick={ () => handleEdit() }
                        >
                            {isEdit ? 'Save' : 'Edit'}
                        </button>

                        <button 
                            className="delete-task-button" 
                            onClick={ () => handleDelete(item._id) }
                        >{trashIcon}</button>
                    </div>
                </>
            )
        }            

        </div>
    )
}

export default Panel;