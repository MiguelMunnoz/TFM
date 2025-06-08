import { useEffect, useState } from 'react';
import './Task.css';
import Modal from '../Modal/Modal';

const Task = ({task, onDelete}) => {
    const [showModal, setShowModal] = useState(false);

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
                    <div className='description'>{task.description}</div>
                </div>
                <button className='delete-button' onClick={(e)=> {
                        e.stopPropagation();
                        onDelete(task._id);
                    }}>
                    {trashIcon}
                </button>
            </div>

            { showModal && <Modal task={task} onClose={ () => setShowModal(false) }/>}
        </>
    )
}

export default Task;