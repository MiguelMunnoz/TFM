import './Panel.css';

import ImageGallery from '../ImageGallery/ImageGallery';

const Panel = ({task}) => {
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
                <button className="update-button">Update</button>
            </div>
        </div>
    )
}

export default Panel;