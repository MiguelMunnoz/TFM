import { useState, useEffect } from 'react';
import './TasksView.css';

/*Components*/
import Task from '../../components/Task/Task'; // Asegúrate de que este componente exista
import TaskGallery from '../../components/TaskGallery/TaskGallery';
import Modal from '../../components/Modal/Modal';

/*Servides*/
import { taskService } from '../../services/api';

/*Redux Toolkit*/
import { useSelector, useDispatch } from 'react-redux';
import { setTasks, setModalVisibility } from '../../slices/taskSlice';

const TasksView = () => {
	const [checked, setChecked] = useState(false);
	const dispatch = useDispatch();
	const tasks = useSelector((state) => state.tasks.tasks);
	const isModalVisible = useSelector((state) => state.tasks.isModalVisible);

	/*Recargamos la lista cada vez que se modifique el array de tareas*/
	useEffect(() => {
		const fetchTasks = async () => {
			const res = await taskService.getAll();
			dispatch(setTasks(res.data));
		};
		fetchTasks();
	}, [dispatch]);

	const handleSubmit = () => {
		dispatch(setModalVisibility(true))
	}

	/*Manejamos el filtro*/
	const handleFilter = (statusFilter, favFilter) => {
		
		const fetchFilter = async () => {
			const res = await taskService.filter(statusFilter, favFilter);
			dispatch(setTasks(res.data));
		};
		fetchFilter();
	}

	const handleFav = (e) => {
		setChecked(e.target.checked); // true o false
		const statusValue = document.getElementById('status-filter').value;
		handleFilter(statusValue, e.target.checked);
	}
	
	return (
		<div className="view">

			<section className="header-section">
				<div className="config-container">

					<button onClick={()=>handleSubmit()}>Create task</button>
				</div>
				<div className="filter-container">
					<div className="wrapper status-filter-wrapper">
						<label className="status-label" htmlFor="status-filter">🔍 Status Filter: </label>
						<select id="status-filter" className="input" onChange={(e)=>handleFilter(e.target.value, checked)}>
							<option value="all">All</option>
							<option className="status-pending" value="pending">Pending</option>
							<option className="status-in-progress" value="in-progress">In Progress</option>
							<option className="status-completed" value="completed">Completed</option>
						</select>
					</div>
					<div className="wrapper fav-filter-wrapper">
						<label className="fav-label" htmlFor="fav-filter">🌟 Favorites: </label>
						<input type="checkbox" className="checkbox" name="fav-filter" onChange={(e)=>handleFav(e)} />
					</div>
				</div>
			</section>

			<section className="content-section">
				<TaskGallery tasks={tasks}/>
			</section>

			{ isModalVisible && <Modal onClose={()=> dispatch(setModalVisibility(false))}/>}

		</div>
	);
};

export default TasksView;
