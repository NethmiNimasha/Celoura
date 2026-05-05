import React from "react";

function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-700">
        Dashboard
      </h1>

      <div className="mt-6">
        <p>👗 Orders</p>
        <p>📏 Measurements</p>
        <p>👤 Profile</p>
      </div>
    </div>
  );
}

export default Dashboard;