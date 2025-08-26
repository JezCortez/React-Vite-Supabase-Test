import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Password updated successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleResetPassword} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Reset Your Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-3 py-2 mb-4 w-full"
          required
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Update Password
        </button>
        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
      </form>
    </div>
  );
}
