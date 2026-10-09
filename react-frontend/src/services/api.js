/**
 * Legacy API Service Adapter
 *
 * Maintained for backward compatibility with existing code importing from services/api.js.
 * All functionality is delegated to the centralized API architecture in `src/api/`.
 */

import http, { expressHttp, springHttp } from '../api/http';
import { healthApi } from '../api/health.api';

// URLs for both backend services
export const EXPRESS_URL =
  import.meta.env.VITE_EXPRESS_API_URL ||
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:5000';

export const SPRING_URL =
  import.meta.env.VITE_SPRING_API_URL || 'http://localhost:8080';

// Axios client instances
export const expressClient = expressHttp;
export const springClient = springHttp;
export const apiClient = http;

// Health status helpers
export const getExpressHealthStatus = (options) => healthApi.getExpressHealth(options);
export const getSpringHealthStatus = (options) => healthApi.getSpringHealth(options);
export const getParallelHealthStatus = (options) => healthApi.getParallelHealth(options);
export const getHealthStatus = getExpressHealthStatus;

export default apiClient;
