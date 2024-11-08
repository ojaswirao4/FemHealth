import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { useHealthStore } from '../store/healthStore';

function Analysis() {
  const { calculateHealthScores, healthData } = useHealthStore();
  const healthScores = calculateHealthScores();
  const COLORS = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeead'];

  const getLatestMetrics = () => {
    const dates = Object.keys(healthData.dailyMetrics);
    if (dates.length === 0) return null;
    return healthData.dailyMetrics[dates[dates.length - 1]];
  };

  const latestMetrics = getLatestMetrics();

  const getRiskFactors = () => {
    if (!latestMetrics) return [];

    const risks = [];
    if (latestMetrics.sleep < 7) {
      risks.push({
        factor: 'Sleep Duration',
        status: 'high',
        recommendation: 'Aim for 7-9 hours of sleep per night',
      });
    }
    if (latestMetrics.stress > 3) {
      risks.push({
        factor: 'Stress Level',
        status: 'high',
        recommendation: 'Consider meditation and stress management techniques',
      });
    }
    if (latestMetrics.exercise < 30) {
      risks.push({
        factor: 'Physical Activity',
        status: 'medium',
        recommendation: 'Try to get at least 30 minutes of exercise daily',
      });
    }
    if (latestMetrics.water < 2) {
      risks.push({
        factor: 'Hydration',
        status: 'medium',
        recommendation: 'Increase water intake to at least 2L per day',
      });
    }

    return risks;
  };

  const riskFactors = getRiskFactors();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Health Analysis</h1>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Health Scores</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthScores}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#ff6b6b" name="Your Score" />
                <Line type="monotone" dataKey="ideal" stroke="#4ecdc4" name="Ideal Score" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Health Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={healthScores}
                  dataKey="score"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {healthScores.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Risk Assessment</h2>
        <div className="space-y-4">
          {riskFactors.map((factor) => (
            <div key={factor.factor} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              {factor.status === 'high' ? (
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
              ) : factor.status === 'medium' ? (
                <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
              ) : (
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
              )}
              <div>
                <h3 className="font-medium text-gray-900">{factor.factor}</h3>
                <p className="text-gray-600">{factor.recommendation}</p>
              </div>
            </div>
          ))}
          {riskFactors.length === 0 && (
            <div className="flex items-center justify-center p-8 text-gray-500">
              No risk factors detected. Keep up the good work!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analysis;