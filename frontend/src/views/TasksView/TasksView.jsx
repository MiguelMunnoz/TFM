import { useEffect } from 'react';
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

const Tasks = () => {
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
	const handleFilter = (filter) => {
		const fetchFilter = async () => {
			const res = await taskService.filter(filter);
			dispatch(setTasks(res.data));
		};
		fetchFilter();
	}
	
	return (
		<div className="view">

			<section className="header-section">
				<div className="config-container">

					<button onClick={()=>handleSubmit()}>Create task</button>
				</div>
				<div className="filter-container">
					<label htmlFor="status-filter">Status Filter</label>
					<select id="status-filter" className="input" onChange={(e)=>handleFilter(e.target.value)}>
						<option value="all">All</option>
						<option value="pending">Pending</option>
						<option value="in-progress">In Progress</option>
						<option value="completed">Completed</option>
					</select>
				</div>
			</section>

			<section className="content-section">
				<TaskGallery tasks={tasks}/>
			</section>

			{ isModalVisible && <Modal onClose={()=> dispatch(setModalVisibility(false))}/>}

		</div>
	);
};

export default Tasks;
