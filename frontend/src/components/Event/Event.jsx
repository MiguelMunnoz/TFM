import { useState, useEffect } from 'react';
import './Event.css';
import Modal from '../Modal/Modal';
import FavIcon from '../FavIcon/FavIcon';
import { weatherService } from '../../services/weatherApi';
import WeatherInfo from '../WeatherInfo/WeatherInfo';

const Event = ({event, onDelete}) => {
    const [showModal, setShowModal] = useState(false);
    const [weather, setWeather] = useState(null);
    const [weatherError, setWeatherError] = useState(null);

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

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await weatherService.getCityWeather(event.city);
                setWeather(response.data);
                setWeatherError(null);
            } catch (error) {
                console.error('[ERROR] Error getting weather.', error);
                setWeather(null);
                setWeatherError('No weather data for this city!');
            }
        };

        if (event.city) {
            fetchWeather();
        }
    }, [event.city]);

    const handleEdit = () => {
        setShowModal(true);
    }

    const formattedDate = new Date(event.date).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                        });

    const formattedLocation = event.country + "/" + event.city;

    return (
        <>
            <div className='event' onClick={()=>handleEdit()}>
                <div className='event-info'>
                    <h3>{event.title}</h3>
                    <span className={`event-status status-${event.status}`}>{event.status}</span>
                    <div className="event-location-container">
                        <div className="event-location-item" >
                            <span role="img" aria-label="calendar">{mapIcon}</span>
                            {formattedLocation}
                        </div>
                    </div>
                    <div className="event-general-info-container">
                        <div className="datetime-container">
                            <div className="datetime-item">
                                <span role="img" aria-label="calendar">📅</span>
                                {formattedDate}
                            </div>
                            <div className="datetime-item">
                                <span role="img" aria-label="clock">🕒</span>
                                {event.time} 
                            </div>
                        </div>
                        

                        {weather && (
                            <div className="datetime-item weather-info">
                                <WeatherInfo
                                    temp={weather.main.temp}
                                    desc={weather.weather[0].description}
                                    icon={weather.weather[0].icon}
                                />
                            </div>
                        )}
                        {weatherError && (
                            <div className="datetime-item weather-info">
                                <WeatherInfo errorMessage={weatherError} />
                            </div>
                        )}
                        
                    </div>
                    <div className='details'>{event.details}</div>
                </div>
                <FavIcon className="fav-icon" event={event}/>
                <button className="delete-button" onClick={(e)=> {
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