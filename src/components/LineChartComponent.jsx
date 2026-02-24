import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LineChartComponent = ({ data, featureName }) => {
    if (!data || data.length === 0) return null;

    return (
        <div className="glass-card p-10 h-[380px] relative overflow-hidden animate-fade-up">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-emerald/5 via-transparent to-transparent pointer-events-none" />
            <div className="flex items-center justify-between mb-8 relative z-10">
                <h3 className="text-xl font-semibold text-slate-100 tracking-tight">
                    Click Trend: <span className="text-gradient font-bold">{featureName}</span>
                </h3>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(15, 23, 42, 0.8)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            padding: '12px'
                        }}
                        itemStyle={{ color: '#fff', fontWeight: 600 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="clicks"
                        stroke="#6366f1"
                        strokeWidth={4}
                        dot={{ fill: '#6366f1', strokeWidth: 2, r: 5, stroke: '#ffffff20' }}
                        activeDot={{ r: 8, fill: '#fff', stroke: '#6366f1', strokeWidth: 3 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineChartComponent;
