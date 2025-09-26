// src/pages/Dashboard.jsx
import React from "react";

function Dashboard() {
  return (
    <div className="container mx-auto p-6 mt-19">
      <h1 className="text-3xl font-bold text-green-800">Dashboard</h1>
      <p className="mt-4 text-gray-600 text-base md:text-lg">
        Welcome to the dashboard. Here you’ll see model predictions, reports, and zone-specific alerts.
      </p>

      {/* Placeholder for future cards, charts, and sections */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white shadow-md rounded-xl p-4">
          {/* Example: main chart / visualization */}
          <p className="text-gray-400">Main chart will go here.</p>
        </div>
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white shadow-md rounded-xl p-4">
            <p className="text-gray-400">Alerts / quick stats</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-4">
            <p className="text-gray-400">Reports summary</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
