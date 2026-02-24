import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../api/analyticsService';
import { UserPlus, Loader2 } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        age: '',
        gender: 'male'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login: setAuthToken } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await authService.register({
                ...formData,
                age: parseInt(formData.age)
            });
            setAuthToken(data.access_token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.detail || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            <div className="w-full max-w-md glass-card p-10 animate-fade-up relative z-10">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-brand-emerald rounded-2xl flex items-center justify-center shadow-2xl shadow-brand-emerald/40 ring-4 ring-brand-emerald/20 mx-auto mb-6">
                        <UserPlus size={32} className="text-white" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-gradient pb-1">Create Account</h1>
                    <p className="text-slate-400 font-medium mt-2">Join us to start tracking analytics</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-400 ml-1">Username</label>
                        <input
                            type="text"
                            required
                            minLength={3}
                            maxLength={50}
                            className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-brand-emerald/50 focus:ring-2 focus:ring-brand-emerald/50 transition-all text-white placeholder:text-slate-600"
                            placeholder="Username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-400 ml-1">Password</label>
                        <input
                            type="password"
                            required
                            minLength={6}
                            className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-brand-emerald/50 focus:ring-2 focus:ring-brand-emerald/50 transition-all text-white placeholder:text-slate-600"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-400 ml-1">Age</label>
                            <input
                                type="number"
                                required
                                className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-brand-emerald/50 focus:ring-2 focus:ring-brand-emerald/50 transition-all text-white placeholder:text-slate-600"
                                placeholder="25"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-400 ml-1">Gender</label>
                            <select
                                className="w-full bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-brand-emerald/50 focus:ring-2 focus:ring-brand-emerald/50 transition-all text-white appearance-none"
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            >
                                <option value="male" className="bg-slate-900">Male</option>
                                <option value="female" className="bg-slate-900">Female</option>
                                <option value="other" className="bg-slate-900">Other</option>
                            </select>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl animate-shake mt-2">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-emerald hover:scale-[1.02] active:scale-[0.98] text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-brand-emerald/30 flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:hover:scale-100"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Create Account'}
                    </button>
                </form>

                <p className="text-center text-slate-400 mt-10 font-medium">
                    Already have an account?{' '}
                    <Link to="/login" className="text-brand-emerald hover:text-emerald-300 transition-colors">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
