import React, { useState } from 'react';
import { useHealthStore } from '../store/healthStore';

function NamePrompt() {
  const [name, setName] = useState('');
  const { updateField } = useHealthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      updateField('name', name.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to GalsOnTheGo </h2>
        <p className="text-gray-600 mb-6">Please enter your name to get started</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
}

export default NamePrompt;