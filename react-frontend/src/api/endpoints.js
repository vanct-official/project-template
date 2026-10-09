/**
 * Centralized API Endpoint Definitions
 * 
 * Defines all endpoint paths in a single location, organized by resource.
 * Supports collection endpoints, detail endpoints with dynamic parameters,
 * and maintains decoupling between UI components and backend route paths.
 */

const API_PREFIX = '/api';

export const API_ENDPOINTS = {
  // Health monitoring endpoints
  health: {
    check: `${API_PREFIX}/health`,
  },

  // System & root metadata endpoints
  system: {
    root: '/',
    welcome: `${API_PREFIX}`,
  },

  // Reference CRUD resource endpoints (e.g. books / items management)
  // Shows collection endpoints, sub-paths, and dynamic parameter functions
  books: {
    list: `${API_PREFIX}/books`,
    detail: (id) => `${API_PREFIX}/books/${encodeURIComponent(id)}`,
    create: `${API_PREFIX}/books`,
    update: (id) => `${API_PREFIX}/books/${encodeURIComponent(id)}`,
    delete: (id) => `${API_PREFIX}/books/${encodeURIComponent(id)}`,
  },
};

export default API_ENDPOINTS;
