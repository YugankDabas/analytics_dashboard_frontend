import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import { ReactLenis } from 'lenis/react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TrackSimulator from './pages/TrackSimulator';

import { analyticsService } from './api/analyticsService';
import { AlertTriangle, Loader2 } from 'lucide-react';

const BackgroundGlows = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-indigo/30 blur-[120px] rounded-full animate-drift opacity-50" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-emerald/30 blur-[120px] rounded-full animate-float opacity-50" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-indigo/10 blur-[140px] rounded-full animate-pulse" />
  </div>
);

const Layout = ({ children }) => (
  <div className="flex min-h-screen relative z-10">
    <Sidebar />
    <main className="flex-1 transition-all duration-300">
      <div className="p-6 md:p-10 max-w-[1600px] mx-auto">
        {children}
      </div>
    </main>
  </div>
);

function App() {
  const [isHealthy, setIsHealthy] = React.useState(null);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (isHealthy === null) setIsHealthy(false);
    }, 5000);

    analyticsService.healthCheck()
      .then(() => {
        clearTimeout(timeout);
        setIsHealthy(true);
      })
      .catch(() => {
        clearTimeout(timeout);
        setIsHealthy(false);
      });

    return () => clearTimeout(timeout);
  }, []);

  if (isHealthy === false) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center relative overflow-hidden bg-slate-900">
        <BackgroundGlows />
        <div className="glass-card p-12 max-w-md relative z-10">
          <AlertTriangle className="text-red-500 mx-auto mb-4" size={48} />
          <h1 className="text-2xl font-bold mb-2">Service Unavailable</h1>
          <p className="text-slate-400">The analytics backend is currently unreachable. Please try again later.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-brand-indigo rounded-xl font-medium hover:scale-105 transition-transform"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (isHealthy === null) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
        <BackgroundGlows />
        <Loader2 className="animate-spin text-brand-indigo relative z-10" size={40} />
      </div>
    );
  }

  return (
    <ReactLenis root>
      <AuthProvider>
        <div className="relative min-h-screen overflow-hidden bg-slate-900">
          <BackgroundGlows />
          <div className="relative z-10">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Layout><Dashboard /></Layout>
                </ProtectedRoute>
              } />

              <Route path="/track" element={
                <ProtectedRoute>
                  <Layout><TrackSimulator /></Layout>
                </ProtectedRoute>
              } />

              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </ReactLenis>
  );
}

export default App;
