import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MousePointer2, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    React.useEffect(() => {
        if (isSidebarOpen && window.innerWidth < 1024) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isSidebarOpen]);

    const navItems = [
        { path: '/dashboard', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { path: '/track', name: 'Track Simulator', icon: <MousePointer2 size={20} /> },
    ];

    return (
        <>
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 h-10 w-10 flex flex-col justify-center items-center gap-1.5 rounded-md bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-300"
                aria-label="Toggle Menu"
            >
                <div className={`h-0.5 w-6 bg-white transition-all duration-300 ${isSidebarOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <div className={`h-0.5 w-6 bg-white transition-opacity duration-300 ${isSidebarOpen ? 'opacity-0' : 'opacity-100'}`} />
                <div className={`h-0.5 w-6 bg-white transition-all duration-300 ${isSidebarOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>

            <div
                className={`
                    fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden
                    ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                `}
                onClick={() => setIsSidebarOpen(false)}
            />

            <div className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-slate-900/80 backdrop-blur-xl border-r border-white/10
                transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:static lg:translate-x-0 lg:z-10 lg:bg-transparent lg:backdrop-blur-none lg:border-none
            `}>
                <div className="flex flex-col h-full lg:p-0 p-4">
                    <div className="lg:glass-card lg:m-4 flex-1 flex flex-col h-full p-8 lg:bg-white/5 lg:backdrop-blur-xl lg:border lg:border-white/10 lg:rounded-3xl">
                        <div className="flex items-center gap-4 mb-12 pl-2 group cursor-default">
                            <div className="w-12 h-12 bg-brand-indigo rounded-xl flex items-center justify-center shadow-lg shadow-brand-indigo/40 ring-4 ring-brand-indigo/20 group-hover:scale-110 transition-transform duration-500">
                                <span className="font-bold text-2xl text-white">A</span>
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-gradient group-hover:brightness-125 transition-all">Analytics</h1>
                        </div>

                        <nav className="flex-1 space-y-4">
                            {navItems.map((item, index) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsSidebarOpen(false)}
                                    style={{
                                        transitionDelay: isSidebarOpen || window.innerWidth >= 1024 ? `${index * 50 + 100}ms` : '0ms',
                                        transform: isSidebarOpen || window.innerWidth >= 1024 ? 'translateX(0)' : 'translateX(-20px)',
                                        opacity: isSidebarOpen || window.innerWidth >= 1024 ? 1 : 0
                                    }}
                                    className={({ isActive }) => `
                                        flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 group/nav
                                        ${isActive
                                            ? 'bg-white/10 text-white shadow-xl border border-white/10 ring-1 ring-white/5'
                                            : 'text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-2'}
                                    `}
                                >
                                    <div className={`p-2 rounded-xl transition-all duration-300 group-hover/nav:scale-110 ${window.location.pathname === item.path ? 'bg-brand-indigo/20 text-brand-indigo shadow-[0_0_20px_rgba(99,102,241,0.4)]' : 'group-hover/nav:bg-white/5'}`}>
                                        {React.cloneElement(item.icon, { size: 22 })}
                                    </div>
                                    <span className="font-semibold text-lg">{item.name}</span>
                                </NavLink>
                            ))}
                        </nav>

                        <button
                            onClick={logout}
                            className="flex items-center gap-4 px-5 py-4 text-slate-400 hover:bg-red-500/10 hover:text-red-400 rounded-2xl transition-all duration-300 mt-auto group/logout"
                        >
                            <div className="p-2 rounded-xl group-hover/logout:bg-red-500/20 group-hover/logout:scale-110 transition-all">
                                <LogOut size={22} />
                            </div>
                            <span className="font-semibold text-lg">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
