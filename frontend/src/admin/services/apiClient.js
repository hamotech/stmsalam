const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = {
  get: async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
    return res.json();
  },
  post: async (endpoint, data) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
    return res.json();
  },
  patch: async (endpoint, data) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
    return res.json();
  },
  delete: async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
    return res.json();
  },
};
