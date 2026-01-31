import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Employees />} />
                    <Route path="employees" element={<Employees />} />
                    <Route path="attendance" element={<Attendance />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
