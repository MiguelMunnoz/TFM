import './Panel.css';

import ImageGallery from '../ImageGallery/ImageGallery';

const Panel = ({task}) => {

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

    return (
        <div className="panel-task-card">
            <section className="task-header">
                <div className="task-title-status">
                    <h3 className="task-title">{task.title}</h3>
                    <span className={`task-status status-${task.status}`}>
                    {task.status}
                    </span>
                </div>

                <div className="task-meta">
                    <span className="task-date">
                    📅 {new Date(task.date).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                    })}
                    </span>

                    <span className="task-time">🕒 {task.time}</span>
                </div>
            </section>

            <section>
                <div className="task-description">
                    <p className="task-description-content">{task.description}</p>
                </div>
            </section>
            
            <section>
                <ImageGallery task={task}/>
            </section>

            <div className="task-actions">
                <button className="update-task-button">Edit</button>
                <button className="delete-task-button">{trashIcon}</button>
            </div>
            
        </div>
    )
}

export default Panel;