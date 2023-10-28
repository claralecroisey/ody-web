import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Settings from './pages/Settings';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { DashboardLayout } from './DashboardLayout';
import { AuthLayout } from './AuthLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="" element={<Home />}></Route>
          <Route path="tasks" element={<Tasks />}></Route>
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
