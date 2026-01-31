import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        employee_id: '',
        full_name: '',
        email: '',
        department: ''
    });

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const response = await api.get('/employees/');
            setEmployees(response.data);
        } catch (error) {
            toast.error('Failed to fetch employees');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/employees/', formData);
            toast.success('Employee added successfully');
            setFormData({ employee_id: '', full_name: '', email: '', department: '' });
            setIsModalOpen(false);
            fetchEmployees();
        } catch (error) {
            toast.error(error.response?.data?.detail || 'Failed to add employee');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this employee?')) return;
        try {
            await api.delete(`/employees/${id}`);
            toast.success('Employee deleted successfully');
            fetchEmployees();
        } catch (error) {
            toast.error('Failed to delete employee');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Employees</h2>
                <Button onClick={() => setIsModalOpen(true)} icon={Plus}>
                    Add Employee
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
            ) : employees.length === 0 ? (
                <div className="text-center p-8 bg-white rounded-lg shadow">
                    <p className="text-gray-500">No employees found. Add one to get started.</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {employees.map((emp) => (
                                <tr key={emp.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{emp.employee_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{emp.full_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.department}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleDelete(emp.id)}
                                            className="text-red-600 hover:text-red-800 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Employee">
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Employee ID"
                        id="employee_id"
                        value={formData.employee_id}
                        onChange={handleInputChange}
                        required
                        placeholder="E.g. EMP001"
                    />
                    <Input
                        label="Full Name"
                        id="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        required
                        placeholder="John Doe"
                    />
                    <Input
                        label="Email"
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="john@example.com"
                    />
                    <Input
                        label="Department"
                        id="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        required
                        placeholder="Engineering"
                    />
                    <div className="mt-6 flex justify-end gap-3">
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Save Employee</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Employees;
