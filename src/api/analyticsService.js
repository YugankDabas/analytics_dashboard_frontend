import api from './axiosInstance';

export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
};

export const analyticsService = {
  getAnalytics: (params) => {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
    );
    return api.get('/analytics/', { params: filteredParams });
  },
  trackEvent: (feature_name) => api.post('/track/', { feature_name }),
  healthCheck: () => api.get('/health'),
};
