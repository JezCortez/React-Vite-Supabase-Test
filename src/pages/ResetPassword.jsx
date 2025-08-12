// src/pages/ResetPassword.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.updateUser({ password });

    if (error) {
      alert(error.message);
    } else {
      alert('Password updated successfully!');
      navigate('/login');
    }
  };

  return (
    <form onSubmit={handleReset} className="p-8 bg-white rounded shadow-md w-96 mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        className="w-full p-2 border mb-4 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Update Password
      </button>
    </form>
  );
}
