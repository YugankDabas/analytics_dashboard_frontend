import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const BarChartComponent = ({ data, onBarClick }) => {
    return (
        <div className="glass-card p-10 h-[380px] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-indigo/5 via-transparent to-transparent pointer-events-none" />
            <h3 className="text-xl font-semibold mb-8 text-slate-100 tracking-tight">Total Clicks by Feature</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis
                        dataKey="feature_name"
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
                        cursor={{ fill: 'rgba(255, 255, 255, 0.05)', radius: 8 }}
                    />
                    <Bar
                        dataKey="total_clicks"
                        radius={[8, 8, 0, 0]}
                        onClick={(data) => onBarClick(data.feature_name)}
                        style={{ cursor: 'pointer' }}
                        className="transition-all duration-300 transform group-hover:scale-[1.02]"
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#6366f1' : '#10b981'} fillOpacity={0.8} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChartComponent;
