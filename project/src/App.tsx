import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import HealthProfile from './pages/HealthProfile';
import Tracking from './pages/Tracking';
import Analysis from './pages/Analysis';
import Recommendations from './pages/Recommendations';
import NamePrompt from './components/NamePrompt';
import { useHealthStore } from './store/healthStore';

function App() {
  const name = useHealthStore((state) => state.healthData.name);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-rose-50">
        {!name && <NamePrompt />}
        <Sidebar />
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<HealthProfile />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/recommendations" element={<Recommendations />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;