import './Modal.css';

import Panel from '../Panel/Panel';
import Form from '../Form/Form';
import taskSchema from '../Form/taskSchema';
import eventSchema from '../Form/eventSchema';

import {useDispatch, useSelector } from 'react-redux';
import { addTask, setModalVisibility } from '../../slices/taskSlice';
import { setEventModalVisibility } from '../../slices/eventSlice';
import { taskService, eventService, imageService } from '../../services/api';
import { useEffect } from 'react';

const Modal = ({type='task', taskId=null, eventId=null, onClose}) => {
    const dispatch = useDispatch();
    const taskFields = useSelector(state => state.tasks.visibleFields);
    const eventFields = useSelector(state => state.events.visibleFields);
    const visibleFields = type === 'event' ? eventFields : taskFields;

    // Buscar la tarea actualizada en el store según taskId
    const task = useSelector(state => {
        const found = state.tasks.tasks.find(t => t._id === taskId);
        return found;
    });

    const event = useSelector(state => {
        const found = state.events.events.find(t => t._id === eventId);
        return found;
    });
    
    const handleClose = () => {
        onClose();
    }

    const handleSubmit = async (createData, imageData=undefined) => {
        if(imageData) {
            const dataImage = await imageService.upload(imageData);
            if (!dataImage) {
                throw new Error('[ERROR] Error uploading files.');
            }
        }

        console.log('Enviando info...');
        if(type === 'event') {
            const res = await eventService.create(createData);
            dispatch(addTask(res.data));
            dispatch(setEventModalVisibility(false));
        } else {
            const res = await taskService.create(createData);
            dispatch(addTask(res.data));
            dispatch(setModalVisibility(false));
        }
    }

    useEffect(() => {
        console.log('Instanciando Modal...');
        console.log('Modal de tipo: ', type);
    }, [])

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <button 
                    className="modal-close" onClick={() => handleClose()}
                >
                    ×
                </button>

                {type === 'event' ? (
                    <Form title='Create Event Form' type={'event'} initialData={null} fields={visibleFields} schema={eventSchema} onSubmit={(eventData, imageData) => handleSubmit(eventData, imageData)}/>
                    ) : (event ? (
                        <Panel event={event} onClose={() => handleClose()}/>
                    ) : (task ? (
                        <Panel task={task} onClose={() => handleClose()}/>
                    ) : (
                        <Form title='Create Task Form' type={'task'} initialData={null} fields={visibleFields} schema={taskSchema} onSubmit={(taskData, imageData)=>handleSubmit(taskData, imageData)}/>    
                    )))}
            </div>
        </div>
    )
}

export default Modal;