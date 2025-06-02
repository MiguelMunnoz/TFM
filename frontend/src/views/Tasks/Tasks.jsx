import Task from '../../components/Task/Task'; // Asegúrate de que este componente exista

import './Tasks.css';

const Tasks = () => {

  const tasks = [
    { id: 1, title: 'Tarea 1', status: 'pendiente' },
    { id: 2, title: 'Tarea 2', status: 'completada' },
    { id: 3, title: 'Tarea 3', status: 'pendiente' },
  ];

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
			{tasks.length > 0 ? (
				tasks.map(task => (
					<Task key={task.id} {...task}/>
				))) : (
					<p>No se encontraron tareas</p>
			)}
		</section>

    </div>
  );
};

export default Tasks;
