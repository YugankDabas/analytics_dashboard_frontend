import React from 'react';
import Cookies from 'js-cookie';
import { Calendar, Users, Target, Filter } from 'lucide-react';
import GlassDropdown from './GlassDropdown';

const FiltersPanel = ({ filters, setFilters, featureNames }) => {
    const handleChange = (name, value) => {
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        Cookies.set('dashboard_filters', JSON.stringify(newFilters), { expires: 7 });
    };

    const ageOptions = [
        { label: 'All Ages', value: '' },
        { label: '< 18', value: '<18' },
        { label: '18 - 40', value: '18-40' },
        { label: '> 40', value: '>40' },
    ];

    const genderOptions = [
        { label: 'All Genders', value: '' },
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
    ];

    const featureOptions = [
        { label: 'All Features', value: '' },
        ...featureNames.map(name => ({ label: name, value: name }))
    ];

    return (
        <div className="glass-card p-6 mb-10 flex flex-wrap gap-6 items-end animate-fade-up relative z-20">
            <div className="space-y-2 flex-1 min-w-[200px]">
                <label className="text-sm font-medium text-slate-400 flex items-center gap-2 ml-1">
                    <Calendar size={14} /> Start Date
                </label>
                <input
                    type="date"
                    className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-brand-indigo/50 focus:ring-2 focus:ring-brand-indigo/50 transition-all"
                    value={filters.start_date || ''}
                    onChange={(e) => handleChange('start_date', e.target.value)}
                />
            </div>

            <div className="space-y-2 flex-1 min-w-[200px]">
                <label className="text-sm font-medium text-slate-400 flex items-center gap-2 ml-1">
                    <Calendar size={14} /> End Date
                </label>
                <input
                    type="date"
                    className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-brand-indigo/50 focus:ring-2 focus:ring-brand-indigo/50 transition-all"
                    value={filters.end_date || ''}
                    onChange={(e) => handleChange('end_date', e.target.value)}
                />
            </div>

            <GlassDropdown
                label="Age Group"
                icon={Users}
                value={filters.age_group || ''}
                options={ageOptions}
                onChange={(val) => handleChange('age_group', val)}
            />

            <GlassDropdown
                label="Gender"
                icon={Users}
                value={filters.gender || ''}
                options={genderOptions}
                onChange={(val) => handleChange('gender', val)}
            />

            <GlassDropdown
                label="Feature"
                icon={Target}
                value={filters.feature_name || ''}
                options={featureOptions}
                onChange={(val) => handleChange('feature_name', val)}
            />

            <button
                onClick={() => {
                    const reset = { start_date: '', end_date: '', age_group: '', gender: '', feature_name: '' };
                    setFilters(reset);
                    Cookies.remove('dashboard_filters');
                }}
                className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-slate-400 hover:text-white group"
                title="Clear Filters"
            >
                <Filter size={20} className="group-hover:rotate-12 transition-transform" />
            </button>
        </div>
    );
};

export default FiltersPanel;
