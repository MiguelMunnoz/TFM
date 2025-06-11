

import { useState, useEffect } from 'react';
import './EventsView.css';

/*Components*/
import Event from '../../components/Event/Event'; // Asegúrate de que este componente exista
import EventGallery from '../../components/EventGallery/EventGallery';
import Modal from '../../components/Modal/Modal';

/*Servides*/
import { eventService } from '../../services/api';

/*Redux Toolkit*/
import { setEvents, setModalVisibility } from '../../slices/eventSlice';

const EventsView = () => {

	/*Recargamos la lista cada vez que se modifique el array de tareas*/
	useEffect(() => {
		const fetchEvents = async () => {
			const res = await eventService.getAll();
			//dispatch(setEvents(res.data));
		};
		fetchEvents();
	}, []/*[dispatch]*/);

	
	
	return (
		<p>hola</p>
	);
};

export default EventsView;
