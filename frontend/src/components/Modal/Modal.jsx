import './Modal.css';

import Form from '../Form/Form';
import taskSchema from '../Form/taskSchema';

const Modal = ({onClose}) => {
    
    const handleClose = () => {
        onClose();
    }

    const handleReset = () => {
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
                <Form title='Create Task Form' fields={['Title', 'Description', 'Status']} schema={taskSchema} onSubmit={()=>handleClose()} onCancel={()=>handleReset()}/>
            </div>
        </div>
    )
}

export default Modal;