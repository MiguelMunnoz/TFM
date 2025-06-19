import './Modal.css';

import Panel from '../Panel/Panel';
import Form from '../Form/Form';
import ConfirmMessage from '../ConfirmMessage/ConfirmMessage';
import taskSchema from '../Form/taskSchema';
import eventSchema from '../Form/eventSchema';

import {useDispatch, useSelector } from 'react-redux';
import { addTask, setModalVisibility } from '../../slices/taskSlice';
import { addEvent, setEventModalVisibility } from '../../slices/eventSlice';
import { taskService, eventService, imageService } from '../../services/api';

const Modal = ({ type = 'task', mode = 'view', taskId = null, eventId = null, onClose, onDeleteConfirm}) => {
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

        if(type === 'event') {
            const res = await eventService.create(createData);
            dispatch(addEvent(res.data));
            dispatch(setEventModalVisibility(false));
        } else {
            const res = await taskService.create(createData);
            dispatch(addTask(res.data));
            dispatch(setModalVisibility(false));
        }
    }

    const handleConfirmDelete = () => {
        if(onDeleteConfirm){
            onDeleteConfirm();
        } 
        onClose();
    };

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <button 
                    className="modal-close" onClick={() => handleClose()}
                >
                    ×
                </button>

                {mode === 'delete' && (
                    <ConfirmMessage type={type} onConfirm={handleConfirmDelete} onCancel={handleClose} />
                )}

                {mode === 'create' && (
                    <Form
                        title={type === 'event' ? 'Create Event Form' : 'Create Task Form'}
                        type={type}
                        initialData={null}
                        fields={visibleFields}
                        schema={type === 'event' ? eventSchema : taskSchema}
                        onSubmit={(data, image) => handleSubmit(data, image)}
                    />
                )}

                {mode === 'view' && (
                    type === 'event' && event ? (
                    <Panel event={event} onClose={handleClose} />
                    ) : task ? (
                    <Panel task={task} onClose={handleClose} />
                    ) : null
                )}
            </div>
        </div>
    )
}

export default Modal;