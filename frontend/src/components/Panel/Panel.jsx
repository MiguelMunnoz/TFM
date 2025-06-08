import './Panel.css';

import ImageGallery from '../ImageGallery/ImageGallery';

import { useDispatch } from 'react-redux';
import { removeTask } from '../../slices/taskSlice';
import { taskService } from '../../services/api';

const Panel = ({task}) => {
    const dispatch = useDispatch();

    console.log('Info de la task: ', task);
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
        console.log('Id de la tarea que quiero eliminar: ', taskId);
        // Esperar a que la animación termine
        setTimeout(() => {
            taskService.delete(taskId);
            dispatch(removeTask(taskId));
        }, 500); // Debe coincidir con la duracion en CSS
    };

    return (
        <div className="panel-task-card">
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
                <button className="update-task-button">Edit</button>
                <button className="delete-task-button" onClick={ () => handleDelete(task._id) }>{trashIcon}</button>
            </div>
            
        </div>
    )
}

export default Panel;