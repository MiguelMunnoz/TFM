import { useEffect, useState } from 'react';
import './Task.css';
import Modal from '../Modal/Modal';

const Task = ({task, onDelete}) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(()=>{
        console.log('Task Instanciada: ', task);
    }, []);


    const handleEdit = () => {
        console.log('Click en editar');
        //dispatch(setModalVisibility(true));
        setShowModal(true);
    }

    return (
        <>
            <div className='task' onClick={()=>handleEdit()}>
                <div className='task-info'>
                    <h3>{task.title}</h3>
                    <span className={`task-status status-${task.status}`}>{task.status}</span> 
                    <p className='task-date'>{task.date}</p>
                    <p className='task-time'>{task.time}</p>
                    <div className='description'>Description: {task.description}</div>
                </div>
                <button className='delete-button' onClick={(e)=> {
                        e.stopPropagation();
                        onDelete(task._id);
                    }}>X</button>
            </div>

            { showModal && <Modal task={task} onClose={ () => setShowModal(false) }/>}
        </>
    )
}

export default Task;