import './Panel.css';
import taskSchema from '../Form/taskSchema';
import eventSchema from '../Form/eventSchema';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask, removeTask } from '../../slices/taskSlice';
import { updateEvent, removeEvent } from '../../slices/eventSlice';
import { taskService, eventService, imageService } from '../../services/api';
import { weatherService } from '../../services/weatherApi';

import Modal from '../Modal/Modal';
import Form from '../Form/Form';
import ImageGallery from '../ImageGallery/ImageGallery';
import WeatherInfo from '../WeatherInfo/WeatherInfo';

const Panel = ({task, event}) => {
    const item = task || event;
    const isTask = !!task;
    const [isEdit, setEdit] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [weather, setWeather] = useState(null);
    const [weatherError, setWeatherError] = useState(null);

    const dispatch = useDispatch();
    const visibleFields = useSelector(state =>
        isTask ? state.tasks.visibleFields : state.events.visibleFields
    );

    const mapIcon = (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="location-icon">

            <rect x="10" y="10" width="80" height="80" rx="10" ry="10" fill="#4CAF50" />
            <polygon points="10,60 90,10 90,40 40,90 10,90" fill="#2196F3" opacity="0.7"/>
            <line x1="10" y1="90" x2="90" y2="10" stroke="#FFEB3B" strokeWidth="6" />
            
            <path d="M50,20 
                    C40,20 32,28 32,38 
                    C32,52 50,72 50,72 
                    C50,72 68,52 68,38 
                    C68,28 60,20 50,20 Z" 
                    fill="#F44336" />
            <circle cx="50" cy="38" r="6" fill="#B71C1C" />
        </svg>
    )
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
            <path d="M9 6V4C9 3.45 9.45 3 10 3H14C14.55 3 15 3.45 15 4V6" />
        </svg>
    )

    const formattedDate = new Date(item.date).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                        });

    const formattedLocation = !isTask && (event.country + "/" + event.city);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await weatherService.getCityWeather(event?.city);
                setWeather(response.data);
                setWeatherError(null);
            } catch (error) {
                console.error('[ERROR] Error getting weather.', error);
                setWeather(null);
                setWeatherError('No weather data for this city!');
            }
        };

        if (!isTask && event?.city) {
            fetchWeather();
        }
    }, [isTask, event?.city]);

    const handleEdit = () => {
        setEdit(true);
    }

    const handleDelete = () => {
        setDeleteId(item._id);
        setShowConfirm(true);
    }

    const confirmDelete = async () => {
        if (!deleteId){
            return;
        } 

        const service = isTask ? taskService : eventService;
        const action = isTask ? removeTask : removeEvent;

        try {
            await service.delete(deleteId);
            dispatch(action(deleteId));
        } catch (error) {
            console.error('[ERROR] Error deleting item:', error);
        } finally {
            setShowConfirm(false);
            setDeleteId(null);
        }
    };

    const handleSave = async (data, imageData=undefined) => {
        const service = isTask ? taskService : eventService;
        const updateAction = isTask ? updateTask : updateEvent;
        try {
            if(imageData) {
                const dataImage = await imageService.upload(imageData);
                if (!dataImage) {
                    throw new Error('[ERROR] Error uploading files.');
                }
            }
            
            /*Controlamos duplicados y nos aseguramos de actualizar toda la lista de imagenes*/
            data = {
                ...data,
                images: [...new Set([...(data.images || []), ...(item.images || [])])]
            };
            
            const res = await service.update(item._id, data);
            dispatch(updateAction(res.data));
            setEdit(false);
        } catch (error) {
            console.error('[ERROR] Error updating task.', error);
        }
        
    }

    return (
        <div className="panel-item-card">
            {isEdit ? (
                <Form
                    title={`Edit ${isTask ? 'Task' : 'Event'} Form`}
                    initialData={item}
                    fields={visibleFields}
                    schema={isTask ? taskSchema : eventSchema}
                    onSubmit={handleSave}
                />
            ):(
                <>
                    <section className="item-header">
                        <div className="item-title-status">
                            <h3 className="item-title">{item.title}</h3>
                            <span className={`item-status status-${item.status}`}>
                                {item.status}
                            </span>
                        </div>

                        <div className="item-datetime-container">
                            <div className="datetime-wrapper">
                                <div className="datetime-item">
                                    <span role="img" aria-label="calendar">📅</span>
                                    {formattedDate} 
                                </div>
                                <div className="datetime-item">
                                    <span role="img" aria-label="clock">🕒</span>
                                    {item.time} 
                                </div>
                            </div>
                            {!isTask &&
                                <div className="location-wrapper">
                                    <div className="event-location-item" >
                                        <span role="img" aria-label="calendar">{mapIcon}</span>
                                        {formattedLocation}
                                    </div>
                                </div>
                            }
                        </div>
                    </section>

                    {weather && 
                        <section className="weather-section">
                            <h4>Weather</h4>
                            <div className="weather-container">
                                <WeatherInfo
                                    temp={weather.main.temp}
                                    desc={weather.weather[0].description}
                                    icon={weather.weather[0].icon}
                                />
                            </div>
 
                        </section>
                    }
       
                    {weatherError && (
                            <section className="weather-section">
                                <h4>Weather data:</h4>
                                <div className="weather-container">
                                    <WeatherInfo errorMessage={weatherError} />
                                </div>
                            </section>
                    )}
                        
                    <section>
                        <h4>Description</h4>
                        {isTask ? (
                            <div className="item-description">
                                <p className="item-description-content">{item.description}</p>
                            </div>
                        ) : (
                            <div className="item-description">
                                <p className="item-description-content">{item.details}</p>
                            </div>
                        )}
                    </section>
                    
                    {isTask &&
                        <section>
                            <ImageGallery task={item}/>
                        </section>
                     }

                    <div className="item-actions">
                        <button 
                            className="update-item-button" 
                            onClick={ () => handleEdit() }
                        >
                            {isEdit ? 'Save' : 'Edit'}
                        </button>

                        <button className="delete-item-button" onClick={() => handleDelete()}> 
                            {trashIcon} 
                        </button>
                    </div>

                    {showConfirm && (
                        isTask ? (
                            <Modal type='task' mode='delete' taskId={task._id} onClose={() => setShowConfirm(false)} onDeleteConfirm={confirmDelete}/>
                        ) : (
                            <Modal type='event' mode='delete' taskId={event._id} onClose={() => setShowConfirm(false)} onDeleteConfirm={confirmDelete}/>
                        )
                    )}
                </>
            )
        }            

        </div>
    )
}

export default Panel;