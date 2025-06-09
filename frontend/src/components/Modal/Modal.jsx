import './Modal.css';

import Panel from '../Panel/Panel';
import Form from '../Form/Form';
import taskSchema from '../Form/taskSchema';

import {useDispatch, useSelector } from 'react-redux';
import { addTask, setModalVisibility } from '../../slices/taskSlice';
import { taskService, imageService } from '../../services/api';

const Modal = ({taskId=null, onClose}) => {
    const dispatch = useDispatch();
    const visibleFields = useSelector(state => state.tasks.visibleFields);

    // Buscar la tarea actualizada en el store según taskId
    const task = useSelector(state => {
        const found = state.tasks.tasks.find(t => t._id === taskId);
        return found;
    });
    
    const handleClose = () => {
        onClose();
    }

    const handleSubmit = async (taskData, imageData=undefined) => {
        if(imageData) {

            const dataImage = await imageService.upload(imageData);
            if (!dataImage) {
                throw new Error('[ERROR] Error uploading files.');
            }
        }

        const res = await taskService.create(taskData);
        dispatch(addTask(res.data));
        dispatch(setModalVisibility(false));
    }

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <button 
                    className="modal-close" onClick={() => handleClose()}/*onClick={() => dispatch(setModalVisibility(false))}*/
                >
                    ×
                </button>

                {task ? (
                    <Panel task={task} onClose={()=>handleClose()}/>
                ) : (
                    <Form title='Create Task Form' initialData={null} fields={visibleFields} schema={taskSchema} onSubmit={(taskData, imageData)=>handleSubmit(taskData, imageData)}/>
                )}
                
            </div>
        </div>
    )
}

export default Modal;