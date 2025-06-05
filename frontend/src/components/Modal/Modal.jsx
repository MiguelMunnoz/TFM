import './Modal.css';

import Panel from '../Panel/Panel';
import Form from '../Form/Form';
import taskSchema from '../Form/taskSchema';

import {useDispatch } from 'react-redux';
import { addTask, setModalVisibility } from '../../slices/taskSlice';
import { taskService } from '../../services/api';

const Modal = ({task=null, onClose}) => {
    const dispatch = useDispatch();
    
    const handleClose = () => {
        onClose();

    }

    const handleSubmit = async (taskData) => {
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
                    <Form title='Create Task Form' fields={['title', 'description', 'status']} schema={taskSchema} onSubmit={(taskData)=>handleSubmit(taskData)}/>
                )}
                
            </div>
        </div>
    )
}

export default Modal;