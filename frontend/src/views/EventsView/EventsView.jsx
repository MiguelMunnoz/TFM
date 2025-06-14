

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './EventsView.css';

/*Components*/
import Event from '../../components/Event/Event'; // Asegúrate de que este componente exista
import EventGallery from '../../components/EventGallery/EventGallery';
import Modal from '../../components/Modal/Modal';

/*Services*/
import { eventService } from '../../services/api';
import { setEvents, setEventModalVisibility } from '../../slices/eventSlice';

const EventsView = () => {
	const [checked, setChecked] = useState(false);
	const [status, setStatus] = useState('all');
	const dispatch = useDispatch();
	const events = useSelector((state) => state.events.events);
	const isModalVisible = useSelector((state) => state.events.isModalVisible);

	/*Recargamos la lista cada vez que se modifique el array de eventos*/
	useEffect(() => {
		const fetchEvents = async () => {
			const res = await eventService.filter();
			dispatch(setEvents(res.data));
		};
		fetchEvents();
	}, [dispatch]);

	const handleSubmit = () => {
		dispatch(setEventModalVisibility(true))
	}

	const handleFilter = (statusFilter, favFilter) => {
		const fetchFilter = async () => {
			const res = await eventService.filter(statusFilter, favFilter);
			dispatch(setEvents(res.data));
		};
		fetchFilter();
	}

	const handleFav = (e) => {
		setChecked(e.target.checked);
		handleFilter(status, e.target.checked);
	}

	const getStatusClass = (value) => {
		switch (value) {
			case 'pending':
				return 'status-pending';
			case 'in-progress':
				return 'status-in-progress';
			case 'completed':
				return 'status-completed';
			default:
				return 'status-all';
		}
	};

	return (
		<div className="view">

			<section className="header-section">
				<div className="config-container">

					<button onClick={()=>handleSubmit()}>Create Event</button>
				</div>
				<div className="filter-container">
					<div className="wrapper status-filter-wrapper">
						<label className="status-label" htmlFor="status-filter">🔍 Status Filter: </label>
						<select 
							id="status-filter" 
							className={`input ${getStatusClass(status)}`} 
							onChange={(e)=>{
								setStatus(e.target.value);
								handleFilter(e.target.value, checked);
							}}
						>
							<option value="all">All</option>
							<option className="status-pending" value="pending">Pending</option>
							<option className="status-in-progress" value="in-progress">In Progress</option>
							<option className="status-completed" value="completed">Completed</option>
						</select>
					</div>
					<div className="wrapper fav-filter-wrapper">
						<label className="fav-label" htmlFor="fav-filter">🌟 Favorites: </label>
						<input type="checkbox" className="checkbox" name="fav-filter" onChange={(e)=>handleFav(e)}/>
					</div>
				</div>
			</section>

			<section className="content-section">
				<EventGallery events={events}/>
			</section>

			{ isModalVisible && <Modal type={'event'} onClose={()=> dispatch(setEventModalVisibility(false))}/>}

		</div>
	);
};

export default EventsView;
