import React, { useState } from 'react';
import { analyticsService } from '../api/analyticsService';
import { MousePointer2, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

const TrackSimulator = () => {
    const [loading, setLoading] = useState(null);
    const [lastEvent, setLastEvent] = useState(null);

    const buttons = [
        { name: 'Button A', color: 'indigo' },
        { name: 'Button B', color: 'emerald' },
        { name: 'Button C', color: 'indigo' },
        { name: 'Date Filter Used', color: 'slate' },
        { name: 'Gender Filter Used', color: 'slate' },
        { name: 'Bar Chart Click', color: 'indigo' },
    ];

    const handleTrack = async (featureName) => {
        setLoading(featureName);
        try {
            await analyticsService.trackEvent(featureName);
            setLastEvent({ name: featureName, status: 'success' });
        } catch (err) {
            setLastEvent({ name: featureName, status: 'error' });
        } finally {
            setLoading(null);
            setTimeout(() => setLastEvent(null), 3000);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-10 animate-fade-up">
            <div className="pl-2">
                <h1 className="text-4xl font-bold tracking-tight text-gradient pb-1">Tracking Simulator</h1>
                <p className="text-slate-400 font-medium mt-2">Simulate user interactions to test backend tracking endpoints</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {buttons.map((btn) => (
                    <button
                        key={btn.name}
                        onClick={() => handleTrack(btn.name)}
                        disabled={!!loading}
                        className={`
                            glass-card p-10 flex flex-col items-center justify-center gap-6 transition-all duration-500
                            hover:scale-[1.05] hover:shadow-2xl hover:border-white/20 active:scale-95 group relative overflow-hidden
                            ${loading === btn.name ? 'ring-2 ring-brand-indigo/50' : ''}
                        `}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className={`
                            w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 relative z-10
                            ${btn.color === 'indigo' ? 'bg-brand-indigo/10 text-brand-indigo group-hover:bg-brand-indigo group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-indigo/40' : ''}
                            ${btn.color === 'emerald' ? 'bg-brand-emerald/10 text-brand-emerald group-hover:bg-brand-emerald group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-emerald/40' : ''}
                            ${btn.color === 'slate' ? 'bg-slate-500/10 text-slate-400 group-hover:bg-slate-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-slate-500/40' : ''}
                        `}>
                            {loading === btn.name ? <Loader2 className="animate-spin" size={28} /> : <MousePointer2 size={28} />}
                        </div>
                        <span className="font-bold text-xl tracking-tight relative z-10">{btn.name}</span>
                    </button>
                ))}
            </div>

            {lastEvent && (
                <div className={`
                    fixed bottom-10 right-10 p-5 rounded-2xl flex items-center gap-4 animate-fade-up z-50 backdrop-blur-2xl border
                    ${lastEvent.status === 'success' ? 'bg-brand-emerald/10 border-brand-emerald/20 text-brand-emerald shadow-2xl shadow-brand-emerald/20' : 'bg-red-500/10 border-red-500/20 text-red-400 shadow-2xl shadow-red-500/20'}
                `}>
                    <div className={`p-2 rounded-lg ${lastEvent.status === 'success' ? 'bg-brand-emerald/20' : 'bg-red-500/20'}`}>
                        {lastEvent.status === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                    </div>
                    <div>
                        <p className="font-bold text-slate-100">{lastEvent.status === 'success' ? 'Success' : 'Error'}</p>
                        <p className="text-sm font-medium opacity-80">
                            {lastEvent.status === 'success' ? `Tracked event: ${lastEvent.name}` : `Failed to track: ${lastEvent.name}`}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrackSimulator;
