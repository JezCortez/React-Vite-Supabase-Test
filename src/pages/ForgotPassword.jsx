import { useState } from "react";
import { supabase } from "../services/supabaseClient";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    // Detect environment for redirect URL
    const isLocal = window.location.hostname === "localhost";
    const redirectTo = isLocal
      ? "http://localhost:5173/reset-password"
      : "https://react-vite-supabase-test.vercel.app/reset-password"; // change to your deployed URL

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Password reset email sent! Check your inbox.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleForgotPassword} className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 py-2 mb-4 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Send Reset Link
        </button>
        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
      </form>
    </div>
  );
}
