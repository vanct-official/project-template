import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

const THEME_STORAGE_KEY = 'vanct_toolkit_theme';

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {
      console.error('Failed to save theme in localStorage', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100 bg-body text-body">
        {/* Top Navbar */}
        <Navbar theme={theme} onToggleTheme={toggleTheme} />

        {/* Main Application Routes */}
        <main className="flex-grow-1">
          <AppRoutes />
        </main>

        {/* Minimal Developer Footer */}
        <footer className="border-top py-3 text-center text-secondary small bg-body-tertiary">
          <div className="container-fluid px-3">
            <span className="fw-semibold text-body">VanCT Developer Toolkit</span> &mdash; Reusable commands reference for project scaffolds, libraries, and dev utilities.
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
