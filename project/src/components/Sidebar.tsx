import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserCircle, 
  LineChart, 
  Activity, 
  Sparkles,
  Heart
} from 'lucide-react';

function Sidebar() {
  const links = [
    { to: "/", icon: LayoutDashboard, text: "Dashboard" },
    { to: "/profile", icon: UserCircle, text: "Health Profile" },
    { to: "/tracking", icon: Activity, text: "Daily Tracking" },
    { to: "/analysis", icon: LineChart, text: "Analysis" },
    { to: "/recommendations", icon: Sparkles, text: "Recommendations" },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <Heart className="w-8 h-8 text-rose-500" />
          <h1 className="text-2xl font-bold text-rose-500">GalsOnTheGo</h1>
        </div>
        <nav className="space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-rose-100 text-rose-600'
                    : 'text-gray-600 hover:bg-rose-50'
                }`
              }
            >
              <link.icon className="w-5 h-5" />
              <span>{link.text}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;