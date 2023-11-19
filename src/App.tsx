import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Board from './pages/Board';
import Settings from './pages/Settings';
import { DashboardLayout } from './DashboardLayout';
import { AuthLayout } from './AuthLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Landing from './pages/Landing';
import { Callback } from './pages/Callback';
import { AddJob } from './pages/AddJob';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Landing />}></Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="callback" element={<Callback />} />
          <Route path="board">
            <Route index element={<Board />} />
            <Route path="new" element={<AddJob />} />
          </Route>
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="" />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
