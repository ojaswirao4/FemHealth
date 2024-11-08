import React, { useState } from 'react';
import { useHealthStore } from '../store/healthStore';

function HealthProfile() {
  const { healthData, updateField } = useHealthStore();
  const [activeSection, setActiveSection] = useState('general');

  const sections = {
    general: [
      { label: 'Height (cm)', field: 'height', type: 'number' },
      { label: 'Weight (kg)', field: 'weight', type: 'number' },
      { label: 'Age', field: 'age', type: 'number' },
    ],
    reproductive: [
      { label: 'Last Period Date', field: 'lastPeriod', type: 'date' },
      { label: 'Cycle Length (days)', field: 'cycleLength', type: 'number' },
      { label: 'Contraception Type', field: 'contraceptionUse', type: 'select', 
        options: ['None', 'Pills', 'IUD', 'Implant', 'Other'] },
    ],
    lifestyle: [
      { label: 'Sleep Hours', field: 'sleepHours', type: 'number' },
      { label: 'Water Intake (L)', field: 'waterIntake', type: 'number' },
      { label: 'Exercise Minutes/Day', field: 'exerciseDuration', type: 'number' },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Health Profile</h1>
      
      <div className="flex space-x-4 mb-6">
        {Object.keys(sections).map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 rounded-lg ${
              activeSection === section
                ? 'bg-rose-500 text-white'
                : 'bg-white text-gray-600 hover:bg-rose-50'
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-2 gap-6">
          {sections[activeSection as keyof typeof sections].map((field) => (
            <div key={field.field} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              {field.type === 'select' ? (
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                  value={healthData[field.field as keyof typeof healthData] || ''}
                  onChange={(e) => updateField(field.field as any, e.target.value)}
                >
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                  value={healthData[field.field as keyof typeof healthData] || ''}
                  onChange={(e) => updateField(field.field as any, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default HealthProfile;