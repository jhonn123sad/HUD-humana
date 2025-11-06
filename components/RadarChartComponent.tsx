
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Scores } from '../types';

interface RadarChartComponentProps {
  data: Scores;
}

const RadarChartComponent: React.FC<RadarChartComponentProps> = ({ data }) => {
  const chartData = [
    { subject: 'Corpo', A: data.corpo, fullMark: 10 },
    { subject: 'Mente', A: data.mente, fullMark: 10 },
    { subject: 'Dinheiro', A: data.dinheiro, fullMark: 10 },
    { subject: 'Relações', A: data.relacoes, fullMark: 10 },
    { subject: 'Poder', A: data.poder, fullMark: 10 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
        <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00f6ff" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4a6fdf" stopOpacity={0.5}/>
            </linearGradient>
        </defs>
        <PolarGrid stroke="#2a3b5a" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: '#c7d8ff', fontSize: 14 }} />
        <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fill: '#8a9fcf' }} axisLine={false} />
        <Radar name="Score" dataKey="A" stroke="#00f6ff" fill="url(#colorUv)" fillOpacity={0.6} />
        <Tooltip 
            contentStyle={{
                backgroundColor: '#101a30',
                borderColor: '#2a3b5a',
                color: '#c7d8ff'
            }}
            cursor={{ stroke: '#00f6ff', strokeWidth: 1, strokeDasharray: '3 3' }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default RadarChartComponent;

