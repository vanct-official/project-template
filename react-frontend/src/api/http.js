import axios from 'axios';

/**
 * Resolve base URL with fallback chain:
 * 1. Primary: VITE_API_BASE_URL
 * 2. Legacy / template compatibility: VITE_EXPRESS_API_URL or VITE_API_URL
 * 3. Empty string fallback (relies on Vite dev server proxy or reverse proxy in production)
 */
const DEFAULT_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_EXPRESS_API_URL ||
  import.meta.env.VITE_API_URL ||
  '';

const DEFAULT_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 15000;

/**
 * Factory function to create configured Axios client instances.
 * Useful when supporting multiple backend microservices (e.g., Express + Spring Boot)
 * while sharing standard interceptor logic, headers, and error handling.
 *
 * @param {string} baseURL - Target base URL
 * @param {object} customConfig - Additional Axios request configurations
 * @returns {import('axios').AxiosInstance}
 */
export function createHttpClient(baseURL = DEFAULT_BASE_URL, customConfig = {}) {
  const instance = axios.create({
    baseURL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...customConfig.headers,
    },
    ...customConfig,
  });

  // Request Interceptor: Attach authentication token if available
  instance.interceptors.request.use(
    (config) => {
      try {
        // Safe token retrieval from localStorage without circular module dependencies
        const token =
          localStorage.getItem('auth_token') ||
          localStorage.getItem('token') ||
          localStorage.getItem('jwt');

        if (token && !config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch {
        // Handle environments where localStorage may be restricted (e.g., SSR or private mode)
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor: Normalize error presentation without hiding raw response details
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Allow callers to inspect standard cancellation checks (e.g. axios.isCancel(error))
      if (axios.isCancel(error)) {
        return Promise.reject(error);
      }

      // Extract meaningful server error message when available
      const serverMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Network error or backend service unavailable';

      // Enrich error object with standardized properties while preserving original Axios details
      error.friendlyMessage = serverMessage;
      error.statusCode = error.response?.status || 0;
      error.responseData = error.response?.data || null;

      return Promise.reject(error);
    }
  );

  return instance;
}

// Primary HTTP client instance
const http = createHttpClient(DEFAULT_BASE_URL);

// Specific backend instances for dual-backend template compatibility
export const expressHttp = http;
export const springHttp = createHttpClient(
  import.meta.env.VITE_SPRING_API_URL || 'http://localhost:8080'
);

export default http;
