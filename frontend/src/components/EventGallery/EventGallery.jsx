import './EventGallery.css';
import Event from '../Event/Event';
import { useState } from 'react';
import {useDispatch } from 'react-redux';
import { removeEvent } from '../../slices/eventSlice';
import { eventService, imageService } from '../../services/api';

const EventGallery = ({events}) => {
    const [deletingEvents, setDeletingEvents] = useState([]);
    const dispatch = useDispatch();

    const handleDelete = (eventId) => {
        const images = events.find(event => event._id === eventId).images;
        setDeletingEvents((prev) => [...prev, eventId]);

        // Esperar a que la animación termine
        setTimeout(() => {            
            eventService.delete(eventId);
            dispatch(removeEvent(eventId));
            setDeletingEvents((prev) => prev.filter((id) => id !== eventId));
            
            deleteImages(images);
        }, 500); 
    };

    const deleteImages = (images) => {
        images.forEach(img => {
            imageService.deleteImage(img);
        });
    }

    return (
        <div className='event-gallery'>
            {events.length > 0 ? (
                events.map(event => (
                    <div
                        key={event._id}
                        className={`event-gallery-wrapper ${deletingEvents.includes(event._id) ? 'exit' : ''}`}
                    >
                        <Event key={event._id} event={event} onDelete={()=>handleDelete(event._id)}/>
                    </div>
                ))) : (
                    <p>There are no matching events...</p>
            )}
        </div>
        
    )
};

export default EventGallery;
