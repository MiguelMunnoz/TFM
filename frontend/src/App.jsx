import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './layouts/NavBar/NavBar';
import Tasks from './views/TasksView/TasksView';

function App() {

	return (
		<Router>
			<div className='app'>
				<NavBar/>
				<div className='main-content'>
					<Routes>
						<Route path="/" element={<div>Inicio</div>} />
						<Route path='/tasks' element={< Tasks />} />
					</Routes>
				</div>
			</div>
		</Router>
	)
}

export default App
