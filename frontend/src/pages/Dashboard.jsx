import React, { useState, useEffect } from 'react';
import { Users, UserCheck, UserX, BarChart3 } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const DashboardCard = ({ title, value, icon: Icon, color }) => (
    <div className={`bg-white p-6 rounded-lg shadow border-l-4 ${color}`}>
        <div className="flex justify-between items-start">
            <div>
                <p className="text-gray-500 text-sm font-medium">{title}</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-2">{value}</h3>
            </div>
            <div className={`p-3 rounded-full ${color.replace('border-', 'bg-').replace('500', '100')}`}>
                <Icon className={`w-6 h-6 ${color.replace('border-', 'text-')}`} />
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    const [stats, setStats] = useState({
        total_employees: 0,
        present_today: 0,
        absent_today: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/dashboard/stats');
                setStats(response.data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
                toast.error("Could not load dashboard statistics");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <BarChart3 className="w-8 h-8 text-indigo-600" />
                    Dashboard Overview
                </h2>
                <p className="text-gray-500 mt-1">Welcome to HRMS Lite. Here is what is happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard
                    title="Total Employees"
                    value={stats.total_employees}
                    icon={Users}
                    color="border-blue-500"
                />
                <DashboardCard
                    title="Present Today"
                    value={stats.present_today}
                    icon={UserCheck}
                    color="border-green-500"
                />
                <DashboardCard
                    title="Absent Today"
                    value={stats.absent_today}
                    icon={UserX}
                    color="border-red-500"
                />
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href="/employees" className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors group">
                        <div className="font-medium text-indigo-600 group-hover:underline">Manage Employees &rarr;</div>
                        <div className="text-sm text-gray-500">Add, edit, or remove staff members.</div>
                    </a>
                    <a href="/attendance" className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors group">
                        <div className="font-medium text-indigo-600 group-hover:underline">Track Attendance &rarr;</div>
                        <div className="text-sm text-gray-500">Mark daily attendance and view history.</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
