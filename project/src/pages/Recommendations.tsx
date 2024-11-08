import React from 'react';
import { 
  Heart, 
  Brain, 
  Apple, 
  Moon, 
  Dumbbell, 
  Coffee,
  ArrowRight
} from 'lucide-react';

const recommendations = [
  {
    category: 'Exercise',
    icon: Dumbbell,
    color: 'text-purple-500',
    bg: 'bg-purple-100',
    suggestions: [
      'Add 15 minutes of yoga to your morning routine',
      'Try HIIT workouts twice a week',
      'Include more strength training exercises',
    ],
  },
  {
    category: 'Nutrition',
    icon: Apple,
    color: 'text-green-500',
    bg: 'bg-green-100',
    suggestions: [
      'Increase protein intake to support muscle health',
      'Add more leafy greens to your diet',
      'Consider iron supplements during menstruation',
    ],
  },
  {
    category: 'Sleep',
    icon: Moon,
    color: 'text-blue-500',
    bg: 'bg-blue-100',
    suggestions: [
      'Maintain a consistent sleep schedule',
      'Create a relaxing bedtime routine',
      'Limit screen time before bed',
    ],
  },
  {
    category: 'Mental Health',
    icon: Brain,
    color: 'text-rose-500',
    bg: 'bg-rose-100',
    suggestions: [
      'Practice daily meditation',
      'Journal your thoughts and feelings',
      'Schedule regular social connections',
    ],
  },
  {
    category: 'Lifestyle',
    icon: Coffee,
    color: 'text-amber-500',
    bg: 'bg-amber-100',
    suggestions: [
      'Take regular breaks during work',
      'Stay hydrated throughout the day',
      'Practice stress-management techniques',
    ],
  },
  {
    category: 'Reproductive Health',
    icon: Heart,
    color: 'text-pink-500',
    bg: 'bg-pink-100',
    suggestions: [
      'Track your menstrual cycle regularly',
      'Schedule annual gynecological check-ups',
      'Monitor any changes in your cycle',
    ],
  },
];

function Recommendations() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Personalized Recommendations</h1>
        <button className="px-4 py-2 text-rose-500 bg-rose-50 rounded-lg hover:bg-rose-100">
          Update Preferences
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {recommendations.map((rec) => (
          <div key={rec.category} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 rounded-lg ${rec.bg}`}>
                <rec.icon className={`w-6 h-6 ${rec.color}`} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{rec.category}</h2>
            </div>

            <div className="space-y-4">
              {rec.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                  <p className="text-gray-700">{suggestion}</p>
                </div>
              ))}
            </div>

            <button className="mt-4 w-full px-4 py-2 text-rose-500 border border-rose-200 rounded-lg hover:bg-rose-50">
              Learn More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;