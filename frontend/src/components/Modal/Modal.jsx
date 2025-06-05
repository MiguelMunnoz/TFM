import './Modal.css';

import Form from '../Form/Form';
import taskSchema from '../Form/taskSchema';

import {useDispatch } from 'react-redux';
import { addTask } from '../../slices/taskSlice';
import { taskService } from '../../services/api';

const Modal = ({onClose}) => {
    const dispatch = useDispatch();
    
    const handleClose = () => {
        onClose();
    }

    const handleReset = () => {
        onClose();
    }

    const handleSubmit = async (taskData) => {
        const res = await taskService.create(taskData);
        dispatch(addTask(res.data));
        onClose();
    }

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <button 
                    className="modal-close" onClick={() => handleClose()}/*onClick={() => dispatch(setModalVisibility(false))}*/
                >
                    ×
                </button>

                <h2>Crear nueva tarea</h2>
                <Form title='Create Task Form' fields={['title', 'description', 'status']} schema={taskSchema} onSubmit={(taskData)=>handleSubmit(taskData)} onCancel={()=>handleReset()}/>
            </div>
        </div>
    )
}

export default Modal;