import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminPanel from "./pages/AdminPanel";
import AdminRoute from "./components/AdminRoute";

function App() {
  // You'll likely fetch `user` and `profile` here or pass them down via context
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  // Example: fetch profile after login
  // useEffect(() => { fetchProfile() }, [user]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Admin protected route */}
        <Route 
          path="/admin"
          element={
            <AdminRoute user={user} profile={profile}>
              <AdminPanel />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
