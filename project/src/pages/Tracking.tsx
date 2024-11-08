import React, { useState } from 'react';
import { Calendar, Activity, Coffee, Wine, Moon } from 'lucide-react';
import { useHealthStore } from '../store/healthStore';
import { useNavigate } from 'react-router-dom';

function Tracking() {
  const navigate = useNavigate();
  const { addDailyMetrics } = useHealthStore();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [formData, setFormData] = useState({
    exercise: { type: '', duration: 0, intensity: '' },
    nutrition: { water: 0, meals: 0, caffeine: 0 },
    sleep: { hours: 0, quality: '' },
    lifestyle: { stress: '', mood: '', alcohol: '' },
  });

  const handleSubmit = () => {
    const metrics = {
      sleep: formData.sleep.hours,
      stress: formData.lifestyle.stress === 'High' ? 5 : formData.lifestyle.stress === 'Medium' ? 3 : 1,
      water: formData.nutrition.water,
      exercise: formData.exercise.duration,
      nutrition: formData.nutrition.meals * 20, // Simple scoring
      mentalHealth: formData.lifestyle.mood === 'Happy' ? 100 : formData.lifestyle.mood === 'Neutral' ? 70 : 40,
    };

    addDailyMetrics(date, metrics);
    navigate('/');
  };

  const trackingCategories = [
    {
      icon: Activity,
      title: 'Exercise',
      fields: [
        { 
          label: 'Type',
          type: 'select',
          options: ['Walking', 'Running', 'Yoga', 'Strength', 'Other'],
          value: formData.exercise.type,
          onChange: (value: string) => setFormData(prev => ({
            ...prev,
            exercise: { ...prev.exercise, type: value }
          }))
        },
        {
          label: 'Duration (minutes)',
          type: 'number',
          value: formData.exercise.duration,
          onChange: (value: number) => setFormData(prev => ({
            ...prev,
            exercise: { ...prev.exercise, duration: value }
          }))
        },
        {
          label: 'Intensity',
          type: 'select',
          options: ['Low', 'Medium', 'High'],
          value: formData.exercise.intensity,
          onChange: (value: string) => setFormData(prev => ({
            ...prev,
            exercise: { ...prev.exercise, intensity: value }
          }))
        },
      ],
    },
    {
      icon: Coffee,
      title: 'Nutrition',
      fields: [
        {
          label: 'Water (L)',
          type: 'number',
          value: formData.nutrition.water,
          onChange: (value: number) => setFormData(prev => ({
            ...prev,
            nutrition: { ...prev.nutrition, water: value }
          }))
        },
        {
          label: 'Meals',
          type: 'number',
          value: formData.nutrition.meals,
          onChange: (value: number) => setFormData(prev => ({
            ...prev,
            nutrition: { ...prev.nutrition, meals: value }
          }))
        },
        {
          label: 'Caffeine (cups)',
          type: 'number',
          value: formData.nutrition.caffeine,
          onChange: (value: number) => setFormData(prev => ({
            ...prev,
            nutrition: { ...prev.nutrition, caffeine: value }
          }))
        },
      ],
    },
    {
      icon: Moon,
      title: 'Sleep',
      fields: [
        {
          label: 'Hours',
          type: 'number',
          value: formData.sleep.hours,
          onChange: (value: number) => setFormData(prev => ({
            ...prev,
            sleep: { ...prev.sleep, hours: value }
          }))
        },
        {
          label: 'Quality',
          type: 'select',
          options: ['Poor', 'Fair', 'Good', 'Excellent'],
          value: formData.sleep.quality,
          onChange: (value: string) => setFormData(prev => ({
            ...prev,
            sleep: { ...prev.sleep, quality: value }
          }))
        },
      ],
    },
    {
      icon: Wine,
      title: 'Lifestyle',
      fields: [
        {
          label: 'Stress Level',
          type: 'select',
          options: ['Low', 'Medium', 'High'],
          value: formData.lifestyle.stress,
          onChange: (value: string) => setFormData(prev => ({
            ...prev,
            lifestyle: { ...prev.lifestyle, stress: value }
          }))
        },
        {
          label: 'Mood',
          type: 'select',
          options: ['Happy', 'Neutral', 'Sad', 'Anxious'],
          value: formData.lifestyle.mood,
          onChange: (value: string) => setFormData(prev => ({
            ...prev,
            lifestyle: { ...prev.lifestyle, mood: value }
          }))
        },
        {
          label: 'Alcohol',
          type: 'select',
          options: ['None', '1-2 drinks', '3+ drinks'],
          value: formData.lifestyle.alcohol,
          onChange: (value: string) => setFormData(prev => ({
            ...prev,
            lifestyle: { ...prev.lifestyle, alcohol: value }
          }))
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Daily Tracking</h1>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {trackingCategories.map((category) => (
          <div key={category.title} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <category.icon className="w-6 h-6 text-rose-500" />
              <h2 className="text-xl font-semibold text-gray-800">{category.title}</h2>
            </div>

            <div className="space-y-4">
              {category.fields.map((field) => (
                <div key={field.label} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      <option value="">Select...</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button 
          onClick={handleSubmit}
          className="px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 font-medium"
        >
          Save Today's Data
        </button>
      </div>
    </div>
  );
}

export default Tracking;