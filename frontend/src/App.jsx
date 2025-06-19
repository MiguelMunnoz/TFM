import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TasksView from './views/TasksView/TasksView';
import EventsView from './views/EventsView/EventsView';
import AuthView from './views/AuthView/AuthView';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import AppLayout from './layouts/AppLayout/AppLayout';

const App = () =>  {

	return (
		<Router>
			<Routes>
				<Route element={<AuthLayout />}>
					<Route path="/" element={<AuthView />} />
				</Route>

				<Route element={<AppLayout />}>
					<Route path="/tasks" element={<TasksView />} />
					<Route path="/events" element={<EventsView />} />
				</Route>
			</Routes>
		</Router>
	)
};

export default App
