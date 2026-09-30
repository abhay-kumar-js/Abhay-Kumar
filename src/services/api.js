const API_BASE = '/api';

/**
 * Standard fetch helper with credentials and token support
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const token = localStorage.getItem('abhay_auth_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
    credentials: 'include', // sends HTTP-only cookies if present
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const errorMsg = data.message || `Request failed with status ${res.status}`;
      const err = new Error(errorMsg);
      err.status = res.status;
      err.data = data;
      throw err;
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error.message);
    throw error;
  }
}

export const api = {
  // Authentication
  auth: {
    login: (credentials) =>
      request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    logout: () =>
      request('/auth/logout', {
        method: 'POST',
      }),
    getMe: () => request('/auth/me'),
  },

  // Projects CRUD
  projects: {
    getAll: () => request('/projects'),
    getBySlug: (slug) => request(`/projects/${slug}`),
    create: (data) =>
      request('/projects', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id, data) =>
      request(`/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id) =>
      request(`/projects/${id}`, {
        method: 'DELETE',
      }),
  },

  // Services CRUD
  services: {
    getAll: () => request('/services'),
    create: (data) =>
      request('/services', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id, data) =>
      request(`/services/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id) =>
      request(`/services/${id}`, {
        method: 'DELETE',
      }),
  },

  // Contact Messages
  contact: {
    sendMessage: (data) =>
      request('/contact', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    getAll: () => request('/contact'),
    updateStatus: (id, status) =>
      request(`/contact/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      }),
    delete: (id) =>
      request(`/contact/${id}`, {
        method: 'DELETE',
      }),
  },

  // Site Settings
  settings: {
    get: () => request('/settings'),
    update: (data) =>
      request('/settings', {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
  },

  // GitHub Activity & Contribution Graph
  github: {
    getActivity: (username = 'abhay-kumar-js') =>
      request(`/github?username=${encodeURIComponent(username)}`),
  },

  // Health and System Diagnostics
  health: () => request('/health'),
};

export default api;
