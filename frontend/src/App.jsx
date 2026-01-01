import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardLayout from './components/DashboardLayout';
import ExpensePage from './pages/ExpensePage';
import ApprovalPage from './pages/ApprovalPage';
import ReportsPage from './pages/ReportPage';
import AuditLogsPage from './pages/AuditLogsPage';
import ProfilePage from './pages/Profile/ProfilePage';
import { Navigate } from 'react-router-dom';
import { ChildCare } from '@mui/icons-material';
import { Children } from 'react';

const AuthGuard = ({children}) => { 
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
         path="/dashboard/*" element={
          <AuthGuard>
          <DashboardLayout />
          </AuthGuard>
          }>
          <Route index element={<h2>Welcome to Dashboard</h2>} />
          <Route path="expenses" element={<ExpensePage />} />
          <Route path="approvals" element={<ApprovalPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="audit-logs" element={<AuditLogsPage />} />
          <Route path="settings" element={<h2>Settings Page</h2>} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>  
        {/* dashboard route is finished here now i added authentication there  */}

      </Routes>
    </Router>
  );
}

export default App;
