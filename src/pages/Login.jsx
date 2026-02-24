import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../api/analyticsService';
import { LogIn, Loader2 } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login: setAuthToken } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await authService.login(formData);
            setAuthToken(data.access_token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            <div className="w-full max-w-md glass-card p-10 animate-fade-up relative z-10">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-brand-indigo rounded-2xl flex items-center justify-center shadow-2xl shadow-brand-indigo/40 ring-4 ring-brand-indigo/20 mx-auto mb-6">
                        <LogIn size={32} className="text-white" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-gradient pb-1">Welcome Back</h1>
                    <p className="text-slate-400 font-medium mt-2">Sign in to access your analytics</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-400 ml-1">Username</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-indigo/50 focus:ring-2 focus:ring-brand-indigo/50 transition-all text-white placeholder:text-slate-600"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-400 ml-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-indigo/50 focus:ring-2 focus:ring-brand-indigo/50 transition-all text-white placeholder:text-slate-600"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl animate-shake">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-indigo hover:scale-[1.02] active:scale-[0.98] text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-brand-indigo/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100 mt-2"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
                    </button>
                </form>

                <p className="text-center text-slate-400 mt-10 font-medium">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-brand-indigo hover:text-indigo-300 transition-colors">
                        Register now
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
