import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import HealthPage from '../pages/HealthPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home initialCategory="All" />} />
      <Route path="/commands" element={<Home initialCategory="All" />} />
      <Route path="/health" element={<HealthPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
