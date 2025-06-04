import { useEffect } from 'react';
import Task from '../../components/Task/Task'; // Asegúrate de que este componente exista
import TaskGallery from '../../components/TaskGallery/TaskGallery';

import './Tasks.css';
import { taskService } from '../../services/api';

import { useSelector, useDispatch } from 'react-redux';
import { setTasks } from '../../slices/taskSlice';

const Tasks = () => {
	const dispatch = useDispatch();
	const tasks = useSelector((state) => state.tasks.tasks);

	/*Recargamos la lista cada vez que se modifique el array de tareas*/
	useEffect(() => {
		const fetchTasks = async () => {
			const res = await taskService.getAll();
			dispatch(setTasks(res.data));
		};
		fetchTasks();
	}, [dispatch]);

	
	return (
		<div className="view">

			<section className="header-section">
				<div className="config-container">

					<button>Create task</button>
				</div>
				<div className="filter-container">
					<label htmlFor="status-filter">Status Filter</label>
					<select id="status-filter" className="input">
						<option value="all">All</option>
						<option value="pending">Pending</option>
						<option value="in progress">In Progress</option>
						<option value="completed">Completed</option>
					</select>
				</div>
			</section>

			<section className="content-section">
				<TaskGallery tasks={tasks}/>
			</section>

		</div>
	);
};

export default Tasks;
