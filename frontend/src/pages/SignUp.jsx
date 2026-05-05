import React, { useState } from "react";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 shadow-lg rounded-lg w-80">
        <h2 className="text-2xl mb-4">Sign Up</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border mb-3"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-3"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-3"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-green-600 text-white p-2 rounded">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Register;