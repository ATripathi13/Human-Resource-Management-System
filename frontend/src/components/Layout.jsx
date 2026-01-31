import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Users, CalendarCheck, LayoutDashboard, LogOut } from 'lucide-react';

const Layout = () => {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md z-10 hidden md:flex flex-col">
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
                        <LayoutDashboard className="w-8 h-8" />
                        HRMS Lite
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <NavLink
                        to="/employees"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`
                        }
                    >
                        <Users className="w-5 h-5" />
                        Employees
                    </NavLink>

                    <NavLink
                        to="/attendance"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`
                        }
                    >
                        <CalendarCheck className="w-5 h-5" />
                        Attendance
                    </NavLink>
                </nav>

                <div className="p-4 border-t">
                    <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="bg-white shadow-sm p-4 md:hidden flex items-center justify-between">
                    <h1 className="text-xl font-bold text-indigo-600">HRMS Lite</h1>
                    {/* Mobile menu button could go here */}
                </header>
                <div className="p-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
