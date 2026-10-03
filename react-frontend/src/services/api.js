import axios from 'axios';

// URLs for both backend services
export const EXPRESS_URL = import.meta.env.VITE_EXPRESS_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const SPRING_URL = import.meta.env.VITE_SPRING_API_URL || 'http://localhost:8080';

// Express Axios instance
export const expressClient = axios.create({
  baseURL: EXPRESS_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

// Spring Boot Axios instance
export const springClient = axios.create({
  baseURL: SPRING_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

// Default client alias (Express)
export const apiClient = expressClient;

/**
 * Fetch health from Express Backend (Port 5000)
 */
export async function getExpressHealthStatus() {
  const startTime = performance.now();
  try {
    const response = await expressClient.get('/api/health');
    const latency = Math.round(performance.now() - startTime);

    return {
      backend: 'ExpressJS',
      port: 5000,
      url: EXPRESS_URL,
      success: true,
      data: response.data,
      latency,
      statusCode: response.status,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    const latency = Math.round(performance.now() - startTime);
    return {
      backend: 'ExpressJS',
      port: 5000,
      url: EXPRESS_URL,
      success: false,
      error: error.response?.data?.message || error.message || 'Không thể kết nối tới Express Backend (Port 5000)',
      statusCode: error.response?.status || 0,
      latency,
      rawError: error
    };
  }
}

/**
 * Fetch health from Spring Boot Backend (Port 8080)
 */
export async function getSpringHealthStatus() {
  const startTime = performance.now();
  try {
    const response = await springClient.get('/api/health');
    const latency = Math.round(performance.now() - startTime);

    return {
      backend: 'Spring Boot',
      port: 8080,
      url: SPRING_URL,
      success: true,
      data: response.data,
      latency,
      statusCode: response.status,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    const latency = Math.round(performance.now() - startTime);
    return {
      backend: 'Spring Boot',
      port: 8080,
      url: SPRING_URL,
      success: false,
      error: error.response?.data?.message || error.message || 'Không thể kết nối tới Spring Boot Backend (Port 8080)',
      statusCode: error.response?.status || 0,
      latency,
      rawError: error
    };
  }
}

/**
 * Fetch parallel health from both backends concurrently
 */
export async function getParallelHealthStatus() {
  const [expressResult, springResult] = await Promise.all([
    getExpressHealthStatus(),
    getSpringHealthStatus()
  ]);

  return {
    express: expressResult,
    spring: springResult
  };
}

// Backward compatibility alias for single call
export const getHealthStatus = getExpressHealthStatus;

export default apiClient;
