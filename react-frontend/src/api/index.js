/**
 * API Barrel Export
 *
 * Provides a unified entry point for all API clients, endpoint configurations,
 * and resource modules across the application.
 */

export { default as http, createHttpClient, expressHttp, springHttp, aspnetHttp } from './http';
export { API_ENDPOINTS } from './endpoints';
export { healthApi } from './health.api';
export { aspnetSamplesApi } from './aspnet-samples.api';
