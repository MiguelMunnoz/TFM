

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './EventsView.css';

/*Components*/
import Event from '../../components/Event/Event'; // Asegúrate de que este componente exista
import EventGallery from '../../components/EventGallery/EventGallery';
import Modal from '../../components/Modal/Modal';

/*Servides*/
import { eventService } from '../../services/api';

/*Redux Toolkit*/
import { setEvents, setEventModalVisibility } from '../../slices/eventSlice';

const EventsView = () => {
	const [checked, setChecked] = useState(false);
	const dispatch = useDispatch();
	const events = useSelector((state) => state.events.events);
	const isModalVisible = useSelector((state) => state.events.isModalVisible);

	/*Recargamos la lista cada vez que se modifique el array de eventos*/
	useEffect(() => {
		const fetchEvents = async () => {
			const res = await eventService.getAll();
			dispatch(setEvents(res.data));
		};
		fetchEvents();
	}, [dispatch]);

	const handleSubmit = () => {
		dispatch(setEventModalVisibility(true))
	}

	return (
		<div className="view">

			<section className="header-section">
				<div className="config-container">

					<button onClick={()=>handleSubmit()}>Create Event</button>
				</div>
				<div className="filter-container">
					<div className="wrapper status-filter-wrapper">
						<label className="status-label" htmlFor="status-filter">🔍 Status Filter: </label>
						<select id="status-filter" className="input">
							<option value="all">All</option>
							<option className="status-pending" value="pending">Pending</option>
							<option className="status-in-progress" value="in-progress">In Progress</option>
							<option className="status-completed" value="completed">Completed</option>
						</select>
					</div>
					<div className="wrapper fav-filter-wrapper">
						<label className="fav-label" htmlFor="fav-filter">🌟 Favorites: </label>
						<input type="checkbox" className="checkbox" name="fav-filter"/>
					</div>
				</div>
			</section>

			<section className="content-section">
				<EventGallery events={events}/>
			</section>

			{ isModalVisible && <Modal type={'event'} onClose={()=> dispatch(setModalVisibility(false))}/>}

		</div>
	);
};

export default EventsView;
