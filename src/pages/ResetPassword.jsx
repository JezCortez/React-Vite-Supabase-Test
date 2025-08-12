import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Extract the access_token from the URL hash
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get("access_token");

    if (accessToken) {
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: params.get("refresh_token")
      });
      setToken(accessToken);
    } else {
      setMessage("Invalid or missing password reset token.");
    }
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!password) {
      setMessage("Please enter a new password.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setMessage("✅ Password has been updated. You can now log in.");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      {message && <p className="mb-4">{message}</p>}
      {token && (
        <form
          onSubmit={handleResetPassword}
          className="bg-white p-6 rounded shadow-md w-80"
        >
          <label className="block mb-2">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-4"
            placeholder="Enter your new password"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Update Password
          </button>
        </form>
      )}
    </div>
  );
}
