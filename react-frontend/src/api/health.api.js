import { expressHttp, springHttp } from './http';
import { API_ENDPOINTS } from './endpoints';

/**
 * Health & System Status API Module
 *
 * Encapsulates all backend health checks, latency measurements, and system metadata queries.
 * Completely independent of React components, hooks, or UI libraries.
 */
export const healthApi = {
  /**
   * Generic health check against default backend
   * @param {import('axios').AxiosRequestConfig} [config]
   */
  check: (config) => expressHttp.get(API_ENDPOINTS.health.check, config),

  /**
   * Root welcome & metadata endpoint
   * @param {import('axios').AxiosRequestConfig} [config]
   */
  getRootInfo: (config) => expressHttp.get(API_ENDPOINTS.system.root, config),

  /**
   * Fetch health and compute latency from Express Backend
   * @param {object} [options]
   * @param {AbortSignal} [options.signal] - Optional AbortController signal
   * @param {import('axios').AxiosRequestConfig} [options.config] - Optional extra Axios options
   */
  getExpressHealth: async ({ signal, ...extraConfig } = {}) => {
    const startTime = performance.now();
    const targetUrl = expressHttp.defaults.baseURL || 'http://localhost:5000';

    try {
      const response = await expressHttp.get(API_ENDPOINTS.health.check, {
        signal,
        ...extraConfig,
      });
      const latency = Math.round(performance.now() - startTime);

      return {
        backend: 'ExpressJS',
        port: 5000,
        url: targetUrl,
        success: true,
        data: response.data,
        latency,
        statusCode: response.status,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const latency = Math.round(performance.now() - startTime);
      return {
        backend: 'ExpressJS',
        port: 5000,
        url: targetUrl,
        success: false,
        error:
          error.friendlyMessage ||
          error.response?.data?.message ||
          error.message ||
          'Không thể kết nối tới Express Backend (Port 5000)',
        statusCode: error.statusCode || error.response?.status || 0,
        latency,
        rawError: error,
      };
    }
  },

  /**
   * Fetch health and compute latency from Spring Boot Backend
   * @param {object} [options]
   * @param {AbortSignal} [options.signal] - Optional AbortController signal
   * @param {import('axios').AxiosRequestConfig} [options.config] - Optional extra Axios options
   */
  getSpringHealth: async ({ signal, ...extraConfig } = {}) => {
    const startTime = performance.now();
    const targetUrl = springHttp.defaults.baseURL || 'http://localhost:8080';

    try {
      const response = await springHttp.get(API_ENDPOINTS.health.check, {
        signal,
        ...extraConfig,
      });
      const latency = Math.round(performance.now() - startTime);

      return {
        backend: 'Spring Boot',
        port: 8080,
        url: targetUrl,
        success: true,
        data: response.data,
        latency,
        statusCode: response.status,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const latency = Math.round(performance.now() - startTime);
      return {
        backend: 'Spring Boot',
        port: 8080,
        url: targetUrl,
        success: false,
        error:
          error.friendlyMessage ||
          error.response?.data?.message ||
          error.message ||
          'Không thể kết nối tới Spring Boot Backend (Port 8080)',
        statusCode: error.statusCode || error.response?.status || 0,
        latency,
        rawError: error,
      };
    }
  },

  /**
   * Concurrently check health across both Express and Spring Boot backends
   * @param {object} [options]
   * @param {AbortSignal} [options.signal] - Shared AbortController signal
   */
  getParallelHealth: async (options = {}) => {
    const [expressResult, springResult] = await Promise.all([
      healthApi.getExpressHealth(options),
      healthApi.getSpringHealth(options),
    ]);

    return {
      express: expressResult,
      spring: springResult,
    };
  },
};

export default healthApi;
