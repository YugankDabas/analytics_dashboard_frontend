import React, { useState, useEffect, useCallback } from 'react';
import { analyticsService } from '../api/analyticsService';
import FiltersPanel from '../components/FiltersPanel';
import BarChartComponent from '../components/BarChartComponent';
import LineChartComponent from '../components/LineChartComponent';
import Cookies from 'js-cookie';
import { Loader2, AlertCircle } from 'lucide-react';

const Dashboard = () => {
    const [filters, setFilters] = useState(() => {
        const saved = Cookies.get('dashboard_filters');
        return saved ? JSON.parse(saved) : {
            start_date: '',
            end_date: '',
            age_group: '',
            gender: '',
            feature_name: ''
        };
    });

    const [data, setData] = useState({ bar_chart: [], line_chart: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAnalytics = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await analyticsService.getAnalytics(filters);
            setData(data);
            setError(null);
        } catch (err) {
            setError('Failed to load analytics data.');
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchAnalytics();
    }, [fetchAnalytics]);

    const handleFilterChange = (newFilters) => {
        const changedField = Object.keys(newFilters).find(key => newFilters[key] !== filters[key]);
        if (changedField) {
            const trackMap = {
                start_date: 'date_filter',
                end_date: 'date_filter',
                age_group: 'age_filter',
                gender: 'gender_filter',
                feature_name: 'feature_filter'
            };
            if (trackMap[changedField]) {
                analyticsService.trackEvent(trackMap[changedField]).catch(console.error);
            }
        }
        setFilters(newFilters);
    };

    const handleBarClick = (featureName) => {
        analyticsService.trackEvent('bar_chart_click').catch(console.error);
        handleFilterChange({ ...filters, feature_name: featureName });
    };

    const featureNames = data.bar_chart.map(item => item.feature_name);

    return (
        <div className="max-w-7xl mx-auto space-y-10 animate-fade-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2 pl-2">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-gradient pb-1">Analytics Overview</h1>
                    <p className="text-slate-400 font-medium">Real-time data insights and user interactions</p>
                </div>
                {loading && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                        <Loader2 className="animate-spin text-brand-indigo" size={18} />
                        <span className="text-sm font-medium text-slate-400">Updating...</span>
                    </div>
                )}
            </div>

            <FiltersPanel
                filters={filters}
                setFilters={handleFilterChange}
                featureNames={featureNames}
            />

            {error ? (
                <div className="glass-card p-12 flex flex-col items-center text-center">
                    <AlertCircle className="text-red-500 mb-4" size={48} />
                    <h2 className="text-xl font-semibold mb-4">{error}</h2>
                    <button
                        onClick={fetchAnalytics}
                        className="px-6 py-2 bg-brand-indigo hover:scale-105 transition-transform rounded-xl font-medium"
                    >
                        Retry
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <div className={`animate-fade-up ${filters.feature_name ? '' : 'xl:col-span-2'}`} style={{ animationDelay: '100ms' }}>
                        <BarChartComponent
                            data={data.bar_chart}
                            onBarClick={handleBarClick}
                        />
                    </div>
                    {filters.feature_name && data.line_chart.length > 0 && (
                        <div className="animate-fade-up" style={{ animationDelay: '200ms' }}>
                            <LineChartComponent
                                data={data.line_chart}
                                featureName={filters.feature_name}
                            />
                        </div>
                    )}
                </div>
            )}

            {!loading && data.bar_chart.length === 0 && !error && (
                <div className="glass-card p-16 text-center text-slate-400 text-lg">
                    No data found for the selected filters.
                </div>
            )}
        </div>
    );
};

export default Dashboard;
