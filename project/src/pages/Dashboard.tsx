import React from 'react';
import { 
  Moon, 
  Heart, 
  Brain, 
  Droplets 
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useHealthStore } from '../store/healthStore';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const { healthData, getWeeklyMetrics } = useHealthStore();
  const weeklyData = getWeeklyMetrics();

  const getLatestMetrics = () => {
    const dates = Object.keys(healthData.dailyMetrics);
    if (dates.length === 0) return null;
    return healthData.dailyMetrics[dates[dates.length - 1]];
  };

  const latestMetrics = getLatestMetrics();

  const stats = [
    {
      title: 'Sleep Score',
      value: latestMetrics ? `${Math.round((latestMetrics.sleep / 8) * 100)}%` : 'N/A',
      icon: Moon,
      color: 'text-indigo-500',
      bg: 'bg-indigo-100',
    },
    {
      title: 'Heart Health',
      value: latestMetrics ? `${Math.round(((60 - latestMetrics.stress) / 60) * 100)}%` : 'N/A',
      icon: Heart,
      color: 'text-rose-500',
      bg: 'bg-rose-100',
    },
    {
      title: 'Stress Level',
      value: latestMetrics ? (latestMetrics.stress <= 2 ? 'Low' : latestMetrics.stress <= 4 ? 'Medium' : 'High') : 'N/A',
      icon: Brain,
      color: 'text-emerald-500',
      bg: 'bg-emerald-100',
    },
    {
      title: 'Hydration',
      value: latestMetrics ? `${latestMetrics.water}L` : 'N/A',
      icon: Droplets,
      color: 'text-blue-500',
      bg: 'bg-blue-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {healthData.name}
        </h1>
        <button 
          onClick={() => navigate('/tracking')}
          className="px-4 py-2 text-white bg-rose-500 rounded-lg hover:bg-rose-600"
        >
          Track Today
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="p-6 bg-white rounded-xl shadow-sm">
            <div className={`inline-block p-3 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <h3 className="mt-4 text-sm font-medium text-gray-600">{stat.title}</h3>
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="p-6 bg-white rounded-xl shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Weekly Overview</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sleep" stroke="#8884d8" name="Sleep (hrs)" />
              <Line type="monotone" dataKey="stress" stroke="#82ca9d" name="Stress Level" />
              <Line type="monotone" dataKey="water" stroke="#ffc658" name="Water (L)" />
              <Line type="monotone" dataKey="exercise" stroke="#ff7300" name="Exercise (min)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;