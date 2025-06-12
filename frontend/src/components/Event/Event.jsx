import { useState } from 'react';
import './Event.css';
import Modal from '../Modal/Modal';
import FavIcon from '../FavIcon/FavIcon';

const Event = ({event, onDelete}) => {
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


    const handleEdit = () => {
        setShowModal(true);
    }

    const formattedDate = new Date(event.date).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                        });

    return (
        <>
            <div className='event' onClick={()=>handleEdit()}>
                <div className='event-info'>
                    <h3>{event.title}</h3>
                    <span className={`event-status status-${event.status}`}>{event.status}</span>
                    <div className="event-datetime-container">
                        <div className="datetime-item">
                            <span role="img" aria-label="calendar">📅</span>
                            {formattedDate}
                        </div>
                        <div className="datetime-item">
                            <span role="img" aria-label="clock">🕒</span>
                            {event.time} 
                        </div>
                    </div> 
                    <div className='details'>{event.details}</div>
                </div>
                <FavIcon className="fav-icon" event={event}/>
                <button className='delete-button' onClick={(e)=> {
                        e.stopPropagation();
                        onDelete(event._id);
                    }}>
                    {trashIcon}
                </button>
            </div>

            { showModal && <Modal eventId={event._id} onClose={ () => setShowModal(false) }/>}
        </>
    )
}

export default Event;