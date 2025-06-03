import { useEffect, useState } from 'react';
import Task from '../../components/Task/Task'; // Asegúrate de que este componente exista
import TaskGallery from '../../components/TaskGallery/TaskGallery';

import './Tasks.css';
import { taskService } from '../../services/api';

const Tasks = () => {
	const [tasks, setTasks] = useState([]);
	//const tasks = [];
	/*const tasks = [
		{ id: 1, title: 'Tarea 1', status: 'pending' },
		{ id: 2, title: 'Tarea 2', status: 'completed' },
		{ id: 3, title: 'Tarea 3', status: 'in-progress' },
	];*/

	useEffect(()=>{
		loadTasks();
	}, []);

	const loadTasks = async () => {
		try {
			console.log('Probando axios...');
			const response = await taskService.getAll();
			console.log('Respuesta de axios: ', response);
			setTasks(response.data);
		} catch (error) {
			console.error('[ERROR] Error loading tasks. ', error)
		}
	}

	return (
		<div className="view">

			<section className="header-section">
				<div className="config-container">
					<button>Configurar vista</button>
					<button>Agregar tarea</button>
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
