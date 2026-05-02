import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/Layout/Navbar';
import Loader from './components/UI/Loader';

const Home = lazy(() => import('./pages/Home'));
const ThreatExplorer = lazy(() => import('./pages/ThreatExplorer'));
const ThreatDetail = lazy(() => import('./pages/ThreatDetail'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Bookmarks = lazy(() => import('./pages/Bookmarks'));
const Quiz = lazy(() => import('./pages/Quiz'));
const ScamAnalyzer = lazy(() => import('./pages/ScamAnalyzer'));

function App() {
  const theme = useSelector(state => state.theme.mode);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 animate-gradient text-slate-900 dark:text-white transition-colors duration-300">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Suspense fallback={<Loader fullScreen />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explorer" element={<ThreatExplorer />} />
              <Route path="/threat/:id" element={<ThreatDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/analyzer" element={<ScamAnalyzer />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
