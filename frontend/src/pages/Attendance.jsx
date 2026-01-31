import React, { useState, useEffect } from 'react';
import { Plus, Search, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';

const Attendance = () => {
    const [employees, setEmployees] = useState([]);
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        employee_id: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present'
    });

    // Fetch employees for dropdowns
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await api.get('/employees/');
                setEmployees(response.data);
            } catch (error) {
                toast.error('Failed to fetch employees list');
            }
        };
        fetchEmployees();
    }, []);

    // Fetch attendance when selected employee changes
    useEffect(() => {
        if (selectedEmployee) {
            fetchAttendance(selectedEmployee);
        } else {
            setAttendanceRecords([]);
        }
    }, [selectedEmployee]);

    const fetchAttendance = async (empId) => {
        try {
            setLoading(true);
            const response = await api.get(`/attendance/${empId}`);
            setAttendanceRecords(response.data);
        } catch (error) {
            // If 404, it might mean no records or connection error. 
            // Requirement says "View attendance history", possibly none yet.
            console.error(error);
            setAttendanceRecords([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.employee_id) {
            toast.error("Please select an employee");
            return;
        }

        try {
            await api.post('/attendance/', formData);
            toast.success('Attendance marked successfully');
            setFormData({
                employee_id: '',
                date: new Date().toISOString().split('T')[0],
                status: 'Present'
            });
            setIsModalOpen(false);

            // Refresh list if seeing this employee
            if (selectedEmployee == formData.employee_id) {
                fetchAttendance(selectedEmployee);
            }
        } catch (error) {
            toast.error(error.response?.data?.detail || 'Failed to mark attendance');
        }
    };

    // Helper to find employee name
    const getEmployeeName = (id) => {
        const emp = employees.find(e => e.id === id);
        return emp ? emp.full_name : 'Unknown';
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Attendance</h2>
                <Button onClick={() => setIsModalOpen(true)} icon={Plus}>
                    Mark Attendance
                </Button>
            </div>

            {/* Filter Section */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <div className="flex items-center gap-4">
                    <Search className="text-gray-400 w-5 h-5" />
                    <select
                        className="block w-full max-w-sm pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
                        value={selectedEmployee}
                        onChange={(e) => setSelectedEmployee(e.target.value)}
                    >
                        <option value="">Select an employee to view history...</option>
                        {employees.map(emp => (
                            <option key={emp.id} value={emp.id}>{emp.full_name} ({emp.employee_id})</option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
            ) : !selectedEmployee ? (
                <div className="text-center p-12 bg-white rounded-lg shadow border-2 border-dashed border-gray-200">
                    <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No Employee Selected</h3>
                    <p className="mt-1 text-sm text-gray-500">Select an employee above to view their attendance record.</p>
                </div>
            ) : attendanceRecords.length === 0 ? (
                <div className="text-center p-8 bg-white rounded-lg shadow">
                    <p className="text-gray-500">No attendance records found for this employee.</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {attendanceRecords.map((record, index) => (
                                <tr key={record.id || index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${record.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {record.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {getEmployeeName(record.employee_id)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Mark Attendance Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Mark Attendance">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="modal_employee" className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
                        <select
                            id="employee_id"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            value={formData.employee_id}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Employee</option>
                            {employees.map(emp => (
                                <option key={emp.id} value={emp.id}>{emp.full_name}</option>
                            ))}
                        </select>
                    </div>

                    <Input
                        label="Date"
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                    />

                    <div className="mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            id="status"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            value={formData.status}
                            onChange={handleInputChange}
                        >
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                        </select>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Attendance;
