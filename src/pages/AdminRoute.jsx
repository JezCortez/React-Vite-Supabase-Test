import { Navigate } from "react-router-dom";

export default function AdminRoute({ user, profile, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (profile?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
